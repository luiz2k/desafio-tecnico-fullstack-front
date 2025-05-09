import { addParticipantsToTheCampaignAction } from "@/features/campaign/actions/add-participants-to-the-campaign";
import { findInfluencersUnrelatedToTheCampaignAction } from "@/features/campaign/actions/find-influencers-unrelated-to-the-campaign-action";
import { Description } from "@/features/campaign/components/create-campaign-drawer/hooks/use-create-campaign-drawer";
import { CampainsInfluencersContext } from "@/features/campaign/context/campains-influencers-context/campains-influencers-context";
import { Influencer } from "@/features/influencer/types/influencer-type";
import { useContext, useEffect, useState } from "react";

type UseAddInfluencerModalProps = {
  setIsAddInfluencerOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
export function useAddInfluencerModal({
  setIsAddInfluencerOpen,
}: UseAddInfluencerModalProps) {
  const { campaignSelected, listParticipants } = useContext(
    CampainsInfluencersContext,
  );

  const [description, setDescription] = useState<Description>({
    color: "default",
    message:
      "Após selecionar e confirmar os influenciadores, os influenciadores selecionados serão listados na campanha. Deseja prosseguir?",
  });

  const [influencers, setInfluencers] = useState<Influencer[]>([]);
  const [participants, setParticipants] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);

  const handleUpdateInfluencers = async () => {
    try {
      setIsDisabled(true);

      const response = await addParticipantsToTheCampaignAction(
        campaignSelected,
        participants,
      );

      if (response.error) {
        throw new Error(response.message);
      }

      await listParticipants(campaignSelected);
      setIsAddInfluencerOpen(false);
    } catch (error) {
      if (error instanceof Error) {
        setDescription({
          color: "error",
          message: error.message,
        });
      }
    } finally {
      setIsDisabled(false);
    }
  };

  useEffect(() => {
    const findInfluencers = async () => {
      try {
        setIsLoading(true);

        const influencers =
          await findInfluencersUnrelatedToTheCampaignAction(campaignSelected);

        if (influencers.error) {
          throw new Error(influencers.message);
        }

        if (influencers.data?.length === 0) {
          setDescription({
            color: "error",
            message:
              "Nenhum influenciador disponível para ser adicionado a essa campanha",
          });
        }

        if (influencers.data) {
          setInfluencers(influencers.data);
        }
      } catch (error) {
        if (error instanceof Error) {
          setDescription({
            color: "error",
            message: error.message,
          });
        }
      } finally {
        setIsLoading(false);
        setIsDisabled(false);
      }
    };

    findInfluencers();
  }, [campaignSelected]);

  const handleInfluencerParticipant = (value: string) => {
    setParticipants((prev) => {
      const updated = prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value];

      return updated;
    });
  };

  return {
    description,
    influencers,
    participants,
    isLoading,
    isDisabled,
    handleUpdateInfluencers,
    handleInfluencerParticipant,
  };
}
