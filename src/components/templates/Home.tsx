import React from "react";

import { Card } from "../../types";
import { Body } from "../atoms/Body";
import { Container } from "../atoms/Container";
import { CredentialList } from "../organisms/CredentialList";
import { Header } from "../organisms/Header";

export interface HomeTemplateProps {
  cards: Card[];
}

export const HomeTemplate: React.FC<HomeTemplateProps> = ({ cards }) => {
  return (
    <Body>
      <Header />
      <Container>
        <CredentialList cards={cards} />
      </Container>
    </Body>
  );
};
