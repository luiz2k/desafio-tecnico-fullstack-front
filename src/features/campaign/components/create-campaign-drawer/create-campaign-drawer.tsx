"use client";

import { CampaignStatus } from "@/features/enums/campaign-status-enum";
import { Influencer } from "@/features/influencer/types/influencer-type";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  Checkbox,
  Drawer,
  IconButton,
  Input,
  Select,
  Typography,
  TypographyProps,
} from "@material-tailwind/react";
import { X } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { createCampaignAction } from "../../actions/create-campaign-action/create-campaign-action";
import {
  CreateCampaignParticipantDto,
  createCampaignParticipantSchema,
} from "../../validations/create-campaign-validation";

type Description = {
  color: TypographyProps["color"];
  message: string;
};

type CreateCampaignDrawerProps = {
  influencers?: Influencer[];
};

export function CreateCampaignDrawer({
  influencers,
}: CreateCampaignDrawerProps) {
  const [description, setDescription] = useState<Description>({
    color: "default",
    message: "Preencha o formulário abaixo para criar uma nova campanha",
  });

  const [participants, setParticipants] = useState<string[]>([]);

  const [createInfluencer, setCreateInfluencer] = useState(false);

  const form = useForm<CreateCampaignParticipantDto>({
    resolver: zodResolver(createCampaignParticipantSchema),
  });

  const onSubmit = async (data: CreateCampaignParticipantDto) => {
    try {
      const response = await createCampaignAction(data);

      if (response?.error) {
        throw new Error(response.message);
      }

      form.reset();

      setParticipants([]);

      setCreateInfluencer(false);

      setDescription({
        color: "default",
        message: "Preencha o formulário abaixo para criar uma nova campanha",
      });
    } catch (error) {
      if (error instanceof Error) {
        setDescription({
          color: "error",
          message: error.message,
        });
      }
    }
  };

  const handleChangeStartedAt = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const value = event.target.value;

    form.setValue("campaign.startedAt", new Date(value));
  };

  const handleChangeFinishedAt = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const value = event.target.value;

    form.setValue("campaign.finishedAt", new Date(value));
  };

  const handleChangeSelect = (value: string) => {
    form.setValue("campaign.status", value as CampaignStatus);
  };

  console.log(participants);

  const handleInfluencerParticipant = (value: string) => {
    if (participants.includes(value)) {
      setParticipants((prev) => {
        const filteredInfluencers = prev.filter((item) => item !== value);

        form.setValue("participants", filteredInfluencers);

        return filteredInfluencers;
      });
    } else {
      setParticipants((prev) => {
        form.setValue("participants", [...prev, value]);

        return [...prev, value];
      });
    }
  };

  return (
    <Drawer open={createInfluencer} onOpenChange={setCreateInfluencer}>
      <Drawer.Trigger
        as={Button}
        size="sm"
        onClick={() => setCreateInfluencer(true)}
      >
        Criar Campanha
      </Drawer.Trigger>
      <Drawer.Overlay>
        <Drawer.Panel placement="left">
          <div className="flex items-center justify-between gap-4">
            <Typography type="h5">Criando Campanha</Typography>
            <Drawer.DismissTrigger
              as={IconButton}
              size="sm"
              variant="ghost"
              color="secondary"
              className="absolute right-2 top-2"
              isCircular
            >
              <X className="h-5 w-5" />
            </Drawer.DismissTrigger>
          </div>
          <Typography
            type="small"
            color={description.color}
            className="mb-6 mt-4"
          >
            {description.message}
          </Typography>

          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="mt-6 space-y-4"
          >
            <div className="grid grid-cols-2 gap-2">
              <div>
                <Input
                  type="text"
                  placeholder="Título"
                  {...form.register("campaign.title")}
                />

                {form.formState.errors.campaign?.title && (
                  <Typography type="small" color="error">
                    {form.formState.errors.campaign.title.message}
                  </Typography>
                )}
              </div>

              <div>
                <Input
                  type="text"
                  placeholder="Cliente"
                  {...form.register("campaign.customer")}
                />

                {form.formState.errors.campaign?.customer && (
                  <Typography type="small" color="error">
                    {form.formState.errors.campaign.customer.message}
                  </Typography>
                )}
              </div>
            </div>

            <div>
              <Select onValueChange={handleChangeSelect}>
                <Select.Trigger
                  className="w-72"
                  placeholder="Papel do usuário"
                />
                <Select.List>
                  <Select.Option value="opening">Aberto</Select.Option>
                  <Select.Option value="closed">Fechado</Select.Option>
                </Select.List>
              </Select>

              {form.formState.errors.campaign?.status && (
                <Typography type="small" color="error">
                  {form.formState.errors.campaign.status.message}
                </Typography>
              )}
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <Typography as="label" htmlFor="startedAt" type="small">
                  Início
                </Typography>

                <input
                  type="date"
                  id="startedAt"
                  onChange={handleChangeStartedAt}
                  className="peer h-[38px] w-full select-none rounded-md border border-surface bg-transparent px-2.5 py-2 text-sm text-black shadow-sm outline-none ring ring-transparent transition-all duration-300 ease-in placeholder:text-foreground/60 hover:border-primary hover:ring-primary/10 focus:border-primary focus:outline-none focus:ring-primary/10 disabled:pointer-events-none disabled:opacity-50 aria-disabled:cursor-not-allowed data-[shape=pill]:rounded-full data-[error=true]:border-error data-[success=true]:border-success data-[icon-placement=end]:pe-9 data-[icon-placement=start]:ps-9 dark:text-white"
                />

                {form.formState.errors.campaign?.startedAt && (
                  <Typography type="small" color="error">
                    {form.formState.errors.campaign.startedAt.message}
                  </Typography>
                )}
              </div>

              <div>
                <Typography as="label" htmlFor="finishedAt" type="small">
                  Fim
                </Typography>

                <input
                  type="date"
                  id="finishedAt"
                  onChange={handleChangeFinishedAt}
                  className="peer h-[38px] w-full select-none rounded-md border border-surface bg-transparent px-2.5 py-2 text-sm text-black shadow-sm outline-none ring ring-transparent transition-all duration-300 ease-in placeholder:text-foreground/60 hover:border-primary hover:ring-primary/10 focus:border-primary focus:outline-none focus:ring-primary/10 disabled:pointer-events-none disabled:opacity-50 aria-disabled:cursor-not-allowed data-[shape=pill]:rounded-full data-[error=true]:border-error data-[success=true]:border-success data-[icon-placement=end]:pe-9 data-[icon-placement=start]:ps-9 dark:text-white"
                />

                {form.formState.errors.campaign?.finishedAt && (
                  <Typography type="small" color="error">
                    {form.formState.errors.campaign.finishedAt.message}
                  </Typography>
                )}
              </div>
            </div>

            <hr />

            <div className="space-y-4">
              <div>
                <h6 className="text-lg font-bold">Influenciadores</h6>
                <Typography type="small" className="text-foreground">
                  Selecione os influenciadores que vai participar da campanha
                </Typography>
              </div>

              <div className="max-h-[15rem] overflow-y-auto">
                {influencers && influencers.length > 0 ? (
                  influencers.map((influencer) => (
                    <div key={influencer._id} className="flex gap-2">
                      <Checkbox
                        id={influencer._id}
                        onChange={() =>
                          handleInfluencerParticipant(influencer._id)
                        }
                      >
                        <Checkbox.Indicator />
                      </Checkbox>
                      <label
                        htmlFor={influencer._id}
                        className="-translate-y-0.5 cursor-pointer"
                      >
                        <Typography className="font-semibold">
                          @{influencer.social_network}
                        </Typography>
                        <Typography type="small" className="text-foreground">
                          {influencer.name}
                        </Typography>
                      </label>
                    </div>
                  ))
                ) : (
                  <Typography type="small" color="warning">
                    Nenhum influenciador cadastrado
                  </Typography>
                )}
              </div>
            </div>

            <Button
              isFullWidth
              type="submit"
              disabled={form.formState.isSubmitting}
            >
              Criar
            </Button>
          </form>
        </Drawer.Panel>
      </Drawer.Overlay>
    </Drawer>
  );
}
