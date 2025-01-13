<script setup lang="ts">
import { FormResolverOptions, FormSubmitEvent } from '@primevue/forms'
import { FormUser } from '@types-interfaces/userForm.ts'
import { getAvatarPlaceholderPath } from '@utils/avatar.ts'

type FormErrors = {
    [key in keyof Partial<FormUser>]: {
        message: string
    }[]
}

type EmitType = {
    (event: 'formSubmit', value: FormUser): void
    (event: 'userDelete'): void
}

const props = defineProps<{
    user?: FormUser
}>()

const emit = defineEmits<EmitType>()

const isEditMode = computed(() => !!props.user)

const submitButtonLabel = computed(() =>
    isEditMode.value ? 'Update details' : 'Add user'
)

const initialValues: FormUser = reactive(
    isEditMode.value && props.user
        ? structuredClone(props.user)
        : {
              firstName: '',
              lastName: '',
              avatar: '',
          }
)

const resolver = ({ values }: FormResolverOptions): { errors: FormErrors } => {
    const errors: FormErrors = {}
    if (!values.firstName) {
        errors.firstName = [{ message: 'First Name is required.' }]
    }
    if (!values.lastName) {
        errors.lastName = [{ message: 'Last Name is required.' }]
    }
    return {
        errors,
    }
}

const onFormSubmit = (formSubmitEvent: FormSubmitEvent) => {
    if (formSubmitEvent.valid) {
        emit('formSubmit', {
            firstName: formSubmitEvent.states.firstName.value,
            lastName: formSubmitEvent.states.lastName.value,
            avatar: selectedAvatarFilePath.value || props.user?.avatar || '',
        })
    }
}

const selectedAvatarFilePath = ref<string | null>(null)

// fixme: a solution that works locally without actually uploading the image file
function onFileSelect(event: { files: File[] }) {
    const file = event.files[0]
    selectedAvatarFilePath.value = URL.createObjectURL(file)
}

const onDeleteButtonClick = () => {
    emit('userDelete')
}
</script>

<template>
    <Form
        v-slot="$form"
        :initialValues="initialValues"
        :resolver="resolver"
        @submit="onFormSubmit"
        class="grid gap-y-4 sm:gap-x-4 grid-cols-1 sm:grid-cols-3"
    >
        <Panel class="col-span-2">
            <div class="flex flex-col justify-between sm:h-[300px]">
                <div class="grid gap-4 grid-cols-1 lg:grid-cols-2">
                    <div class="col-span-1 flex flex-col gap-1 pb-4 lg:pb-0">
                        <FloatLabel>
                            <InputText
                                name="firstName"
                                type="text"
                                fluid
                                id="firstName"
                            />
                            <label for="firstName">First Name</label>
                        </FloatLabel>
                        <Message
                            v-if="$form.firstName?.invalid"
                            severity="error"
                            size="small"
                            variant="simple"
                            >{{ $form.firstName.error?.message }}</Message
                        >
                    </div>
                    <div class="col-span-1 flex flex-col gap-1">
                        <FloatLabel>
                            <InputText
                                name="lastName"
                                type="text"
                                fluid
                                id="lastName"
                            />
                            <label for="lastName">Last Name</label>
                        </FloatLabel>
                        <Message
                            v-if="$form.lastName?.invalid"
                            severity="error"
                            size="small"
                            variant="simple"
                            >{{ $form.lastName.error?.message }}</Message
                        >
                    </div>
                </div>

                <div class="mt-8 flex justify-end sm:justify-start gap-4">
                    <Button type="submit" :label="submitButtonLabel" />
                    <Button
                        v-if="isEditMode"
                        severity="danger"
                        label="Delete user"
                        @click="onDeleteButtonClick"
                        class="order-first sm:order-none"
                    />
                </div>
            </div>
        </Panel>
        <Panel class="order-first sm:order-none">
            <div
                class="flex flex-col gap-1 items-center justify-between sm:h-[300px]"
            >
                <Image
                    :src="
                        selectedAvatarFilePath ||
                        user?.avatar ||
                        getAvatarPlaceholderPath()
                    "
                    preview
                    imageClass="rounded-full w-30 h-30 sm:w-36 sm:h-36 object-cover object-center"
                />
                <FileUpload
                    mode="basic"
                    @select="onFileSelect"
                    customUpload
                    auto
                    severity="secondary"
                    class="p-button-outlined mt-4"
                    chooseLabel="Change photo"
                    chooseIcon="pi pi-camera"
                />
            </div>
        </Panel>
    </Form>
</template>
