import { CampainsInfluencersContext } from "@/features/campaign/context/campains-influencers-context/campains-influencers-context";
import { Filter } from "@/features/campaign/services/campaign";
import { Input, Select } from "@material-tailwind/react";
import { useContext, useEffect, useState } from "react";

export function CampainFilter() {
  const { updateCampaigns } = useContext(CampainsInfluencersContext);

  const [campaignFilter, setCampaignFilter] = useState<Filter>({
    title: "",
    status: "",
  });

  const handleChangeTitle = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const title = event?.target.value;

    setCampaignFilter((prev) => ({ ...prev, title }));
  };

  const handleChangeStatus = async (status: string) => {
    setCampaignFilter((prev) => ({ ...prev, status }));
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      updateCampaigns(campaignFilter);
    }, 300);

    return () => clearTimeout(timeout);
  }, [campaignFilter, updateCampaigns]);

  return (
    <div className="flex gap-2.5">
      <Input
        placeholder="Busque pelo título"
        onChange={handleChangeTitle}
        className="bg-white"
      />

      <Select onValueChange={handleChangeStatus}>
        <Select.Trigger className="w-36 bg-white" placeholder="Status" />
        <Select.List>
          <Select.Option value="">Todos</Select.Option>
          <Select.Option value="opening">Aberto</Select.Option>
          <Select.Option value="closed">Fechado</Select.Option>
        </Select.List>
      </Select>
    </div>
  );
}
