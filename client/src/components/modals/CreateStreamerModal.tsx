import NiceModal, { useModal } from "@ebay/nice-modal-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";

import { api } from "@/lib/api";
import { PLATFORMS_OPTIONS } from "@/lib/constants/platform";
import { STORAGE_KEYS } from "@/lib/constants/storage-keys";
import { generateUserId } from "@/lib/helpers/generateUserId";
import {
  CreateStreamerFormInput,
  createStreamerFormSchema,
} from "@/lib/schemas/streamer.schema";
import { toast } from "@/lib/toast";

import { Input } from "../forms/FormInput";
import { Button } from "../ui/Button";
import { Modal } from "../ui/Modal";

export const CreateStreamerModal = NiceModal.create(() => {
  const modal = useModal();

  const { mutateAsync, isLoading } = api.streamers.useCreateOne({
    onSuccess: () => {
      toast({
        title: "Success!",
        description: "Streamer successfully created!",
      });
      modal.remove();
    },
  });

  const methods = useForm<CreateStreamerFormInput>({
    resolver: zodResolver(createStreamerFormSchema),
  });

  const onSubmit = async (data: CreateStreamerFormInput) => {
    const userId =
      localStorage.getItem(STORAGE_KEYS.USER_ID) || generateUserId();
    await mutateAsync({
      ...data,
      userId,
    });
  };

  return (
    <Modal
      isOpen={modal.visible}
      onClose={modal.remove}
      className="min-h-[450px] w-[450px]"
    >
      <Modal.Header title="Add New Streamer" onClose={modal.remove} />
      <Modal.Body>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6 md:col-span-2">
              <div className="col-span-full">
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-gray-200"
                >
                  Name
                </label>
                <Input.Text id="name" name="name" />
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="platform"
                  className="block mb-2 text-sm font-medium text-gray-200"
                >
                  Platform
                </label>
                <Input.Select
                  id="platform"
                  name="platform"
                  options={PLATFORMS_OPTIONS}
                />
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="description"
                  className="block mb-2 text-sm font-medium text-gray-200"
                >
                  Description
                </label>
                <Input.Textarea id="description" name="description" />
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="imageUrl"
                  className="block mb-2 text-sm font-medium text-gray-200"
                >
                  Image URL
                </label>
                <Input.Text id="imageUrl" name="imageUrl" />
              </div>
            </div>

            <div className="flex items-center justify-end mt-4 space-x-2">
              <Button intent="danger" size="lg" onClick={modal.remove}>
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isLoading}
                intent="success"
                size="lg"
              >
                Create
              </Button>
            </div>
          </form>
        </FormProvider>
      </Modal.Body>
    </Modal>
  );
});
