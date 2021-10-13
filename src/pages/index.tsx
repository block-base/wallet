import React from "react";

import { HomeTemplate } from "../components/templates/Home";
import { getVCs } from "../lib/repository/vc";
import { Card } from "../types";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface IndexPageProps {}

const IndexPage: React.FC<IndexPageProps> = () => {
  const [cards, setCards] = React.useState<Card[]>([]);

  React.useEffect(() => {
    const vcs = getVCs();
    if (vcs) {
      const cards = Object.values(getVCs()).map((vc) => {
        return vc.manifest.display.card;
      });
      setCards(cards);
    }
  }, []);

  return <HomeTemplate cards={cards} />;
};

export default IndexPage;