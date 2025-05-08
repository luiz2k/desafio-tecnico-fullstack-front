"use client";

import { DateInput } from "@/components/date-input/date-input";
import { InfluencerFilter } from "@/features/influencer/services/influencer-filter-type";
import { Influencer } from "@/features/influencer/types/influencer-type";
import {
  Button,
  Checkbox,
  Input,
  Select,
  Typography,
} from "@material-tailwind/react";
import { Description } from "../../hooks/use-create-campaign-drawer";
import { useCreateCampaignDrawerForm } from "./hooks/use-create-campaign-drawer-form";

type CreateCampaignDrawerFormProps = {
  setDescription: React.Dispatch<React.SetStateAction<Description>>;
  setIsCreateInfluencerOpen: React.Dispatch<React.SetStateAction<boolean>>;
  influencers?: Influencer[];
  findInfluencers: (filter?: InfluencerFilter) => Promise<void>;
};

export function CreateCampaignDrawerForm({
  setDescription,
  setIsCreateInfluencerOpen,
  influencers,
  findInfluencers,
}: CreateCampaignDrawerFormProps) {
  const {
    form,
    onSubmit,
    handleChangeStatusSelection,
    handleInfluencerParticipant,
    renderError,
    participants,
    filter,
    setFilter,
  } = useCreateCampaignDrawerForm({
    setDescription,
    setIsCreateInfluencerOpen,
    findInfluencers,
  });

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="mt-6 space-y-4">
      <div className="grid grid-cols-2 gap-2">
        <div>
          <Input
            type="text"
            placeholder="Título"
            {...form.register("campaign.title")}
          />
          {renderError(form.formState.errors.campaign?.title?.message)}
        </div>

        <div>
          <Input
            type="text"
            placeholder="Cliente"
            {...form.register("campaign.customer")}
          />
          {renderError(form.formState.errors.campaign?.customer?.message)}
        </div>
      </div>

      <div>
        <Select
          value={form.getValues("campaign.status")}
          onValueChange={handleChangeStatusSelection}
        >
          <Select.Trigger placeholder="Status da campanha" />
          <Select.List>
            <Select.Option value="opening">Aberto</Select.Option>
            <Select.Option value="closed">Fechado</Select.Option>
          </Select.List>
        </Select>
        {renderError(form.formState.errors.campaign?.status?.message)}
      </div>

      <div className="grid grid-cols-2 gap-2">
        <div>
          <Typography as="label" htmlFor="startedAt" type="small">
            Início
          </Typography>

          <DateInput id="startedAt" {...form.register("campaign.startedAt")} />

          {renderError(form.formState.errors.campaign?.startedAt?.message)}
        </div>

        <div>
          <Typography as="label" htmlFor="finishedAt" type="small">
            Fim
          </Typography>

          <DateInput
            id="finishedAt"
            {...form.register("campaign.finishedAt")}
          />

          {renderError(form.formState.errors.campaign?.finishedAt?.message)}
        </div>
      </div>

      <hr />

      <div className="space-y-4">
        <div>
          <Typography type="h6">Influenciadores</Typography>

          <Typography type="small" className="mb-6 mt-4">
            Selecione os influenciadores que vai participar da campanha
          </Typography>
        </div>

        <div className="flex gap-2.5">
          <Input
            type="text"
            placeholder="Pesquisar"
            onChange={(e) =>
              setFilter((prev) => ({ ...prev, value: e.target.value }))
            }
            className="bg-white"
          />

          <Select
            value={filter.key}
            onValueChange={(value) =>
              setFilter((prev) => ({
                ...prev,
                key: value as InfluencerFilter["key"],
              }))
            }
          >
            <Select.Trigger className="w-60 bg-white" placeholder="Filtrar" />
            <Select.List>
              <Select.Option value="name">Nome</Select.Option>
              <Select.Option value="social_network">Rede Social</Select.Option>
            </Select.List>
          </Select>
        </div>

        <div className="max-h-[15rem] overflow-y-auto">
          {influencers && influencers.length > 0 ? (
            influencers.map((influencer) => (
              <div key={influencer._id} className="flex gap-2">
                <Checkbox
                  checked={participants.includes(influencer._id)}
                  id={influencer._id}
                  onChange={() => handleInfluencerParticipant(influencer._id)}
                >
                  <Checkbox.Indicator />
                </Checkbox>
                <label
                  htmlFor={influencer._id}
                  className="-translate-y-0.5 cursor-pointer"
                >
                  <Typography className="font-semibold">
                    {influencer.name}
                  </Typography>
                  <Typography type="small" className="text-foreground">
                    @{influencer.social_network}
                  </Typography>
                </label>
              </div>
            ))
          ) : (
            <Typography type="small">
              nenhum influenciador encontrado
            </Typography>
          )}
        </div>
      </div>

      <Button isFullWidth type="submit" disabled={form.formState.isSubmitting}>
        Criar
      </Button>
    </form>
  );
}
