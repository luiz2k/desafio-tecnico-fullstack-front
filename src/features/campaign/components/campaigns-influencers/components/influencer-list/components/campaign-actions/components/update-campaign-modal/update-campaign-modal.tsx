import { DateInput } from "@/components/date-input/date-input";
import {
  Button,
  Dialog,
  IconButton,
  Input,
  Select,
  Typography,
} from "@material-tailwind/react";
import { X } from "lucide-react";
import { useUpdateCampaignModal } from "./hooks/use-update-campaign-modal";

type DeleteCampaignModalProps = {
  isUpdateCampaignOpen: boolean;
  setIsUpdateCampaignOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export function UpdateCampaignModal({
  isUpdateCampaignOpen,
  setIsUpdateCampaignOpen,
}: DeleteCampaignModalProps) {
  const {
    form,
    description,
    onSubmit,
    handleChangeStatusSelection,
    currentCampain,
    renderError,
  } = useUpdateCampaignModal({ setIsUpdateCampaignOpen });

  return (
    <Dialog
      size="sm"
      open={isUpdateCampaignOpen}
      onOpenChange={setIsUpdateCampaignOpen}
    >
      <Dialog.Overlay>
        <Dialog.Content>
          <div className="flex items-center justify-between gap-4">
            <Typography type="h6">Atualizando Campanha</Typography>

            <Dialog.DismissTrigger
              as={IconButton}
              size="sm"
              variant="ghost"
              color="secondary"
              className="absolute right-2 top-2"
              isCircular
            >
              <X className="h-5 w-5" />
            </Dialog.DismissTrigger>
          </div>

          <Typography color={description.color} className="mb-6 mt-2">
            {description.message}
          </Typography>

          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-2">
              <div>
                <Input
                  type="text"
                  placeholder="Título"
                  {...form.register("title")}
                />
                {renderError("title")}
              </div>

              <div>
                <Input
                  type="text"
                  placeholder="Cliente"
                  {...form.register("customer")}
                />
                {renderError("customer")}
              </div>
            </div>

            <div>
              <Select
                value={currentCampain?.status}
                onValueChange={handleChangeStatusSelection}
              >
                <Select.Trigger placeholder="Status da campanha" />
                <Select.List>
                  <Select.Option value="opening">Aberto</Select.Option>
                  <Select.Option value="closed">Fechado</Select.Option>
                </Select.List>
              </Select>
              {renderError("status")}
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <Typography as="label" htmlFor="startedAt" type="small">
                  Início
                </Typography>

                <DateInput id="startedAt" {...form.register("startedAt")} />

                {renderError("startedAt")}
              </div>

              <div>
                <Typography as="label" htmlFor="finishedAt" type="small">
                  Fim
                </Typography>

                <DateInput id="finishedAt" {...form.register("finishedAt")} />

                {renderError("finishedAt")}
              </div>
            </div>

            <div className="mb-1 flex items-center justify-end gap-2">
              <Dialog.DismissTrigger as={Button} variant="ghost">
                Cancelar
              </Dialog.DismissTrigger>

              <Button
                color="error"
                type="submit"
                disabled={form.formState.isSubmitting}
              >
                Confirmar
              </Button>
            </div>
          </form>
        </Dialog.Content>
      </Dialog.Overlay>
    </Dialog>
  );
}
