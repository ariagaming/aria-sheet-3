import React from "react";
import { connectMyComponent } from "./../services/redux";
import { Page } from "./page";
import { toList } from "./../helpers";
import { Content, ContentStatistic } from "./content";
import "./../styles/components/pageOne.css";

export const PageOne = connectMyComponent(({ character }) => (
  <Page>
    <CharacterInfo character={character} />
    <CharacterStatistics {...character.statistics} />
    <SecondaryStatistics {...character.attributes} />
    <Feats feats={character.feats} />
    <Languages languages={character.languages} />
    <Resistances resistances={character.resistances} />
    <Skills skills={character.skills} />
    <Professions professions={character.professions} />

    <div className="right-side">
      <Equipment equipment={character.equipment} />
      <DMGInformation />
      <Weapons weapons={character.weapons} />
      <Specials specials={character.specials} />
    </div>
  </Page>
));

const CharacterInfo = ({ character }) => (
  <div className="character-info">
    <img src="/assets/character-info.png" alt="character-info" />
  </div>
);

const CharacterStatistics = ({ STR, AGI, INU, PER }) => (
  <div className="character-statistics">
    <img
      src="/assets/statistics-container.png"
      alt="statistics-container.png"
    />

    <div className="character-statistic str">
      <div className="total">{STR.total}</div>
      <div className="calculated">{STR.calculated}</div>
    </div>
    <div className="character-statistic agi">
      <div className="total">{AGI.total}</div>
      <div className="calculated">{AGI.calculated}</div>
    </div>
    <div className="character-statistic inu">
      <div className="total">{INU.total}</div>
      <div className="calculated">{INU.calculated}</div>
    </div>
    <div className="character-statistic per">
      <div className="total">{PER.total}</div>
      <div className="calculated">{PER.calculated}</div>
    </div>
  </div>
);

const SecondaryStatistics = ({
  hp,
  ap,
  expertise,
  movement,
  initiative,
  armor,
  aura,
  ac
}) => (
  <div className="secondary-statistics">
    <ContentStatistic title="hp" value={hp.total} prefix="" postfix="" />
    <ContentStatistic title="ap" value={ap.total} prefix="" postfix="" />
    <ContentStatistic
      title="expertise"
      value={expertise.total}
      prefix="+"
      postfix=""
    />
    <ContentStatistic
      title="movement"
      value={movement.total}
      prefix=""
      postfix="ft"
    />
    <ContentStatistic
      title="initiative"
      value={initiative.total}
      prefix="-"
      postfix="%"
    />
    <ContentStatistic title="armor" value={armor.total} prefix="" postfix="%" />
    <ContentStatistic title="aura" value={aura.total} prefix="" postfix="%" />
    <ContentStatistic title="ac" value={ac.total} prefix="" postfix="" />
  </div>
);

const Feats = ({ feats }) => (
  <Content className="content-feats" title="feats">
    {feats.map((feat, i) => (
      <div key={i} className="content-row">
        <span style={{ flexBasis: "20%" }}>{feat.total}</span>
        <span style={{ flexBasis: "20%", textAlign: "center" }}>
          <span>{feat.sign}</span>
          <span>{feat.total}</span>
          <span>{feat.unit}</span>
        </span>
        <span style={{ flexBasis: "60%", textAlign: "right" }}>
          {feat.title}
        </span>
      </div>
    ))}
  </Content>
);

const Languages = ({ languages }) => (
  <ItemList className="content-languages" title="languages" items={languages} />
);

const Resistances = ({ resistances }) => (
  <ItemList
    className="content-resistances"
    title="resistances"
    items={resistances}
  />
);

const Skills = ({ skills }) => (
  <ItemList className="content-skills" title="skills" items={skills} />
);

const Professions = ({ professions }) => (
  <ItemList
    className="content-professions"
    title="professions"
    items={professions}
  />
);

const ItemList = ({ items, className, title }) => (
  <Content className={className} title={title}>
    {items.map((item, i) => (
      <div key={i} className="content-row">
        <span style={{ flexBasis: "20%" }}>
          <Circle checked={item.bought} />
          <Circle checked={item.expertise} />
        </span>
        <span style={{ flexBasis: "20%", textAlign: "center" }}>
          {item.total || 0}
        </span>
        <span style={{ flexBasis: "60%", textAlign: "right" }}>
          {item.title}
        </span>
      </div>
    ))}
  </Content>
);

const Circle = ({ checked }) => (
  <svg height="10" width="12">
    <circle
      cx="6"
      cy="5"
      r="4"
      fill={checked ? "black" : "white"}
      stroke="black"
    />
  </svg>
);

const Equipment = ({ equipment }) => (
  <Content className="equipment" title="Armor">
    {equipment.map((eq, i) => (
      <div key={i} className="content-row">
        <div>{eq.location}</div>
        <div>{eq.title}</div>
      </div>
    ))}
  </Content>
);

const DMGInformation = () => (
  <div className="dmg-information">
    <ContentStatistic title="AP Offense" value={3} prefix="-" postfix="" />
    <ContentStatistic title="AP defense" value={3} prefix="-" postfix="" />
    <ContentStatistic title="AP recovery" value={4} prefix="+" postfix="" />
    <ContentStatistic title="DMG per AP" value={1} prefix="" postfix="" />
  </div>
);

const Weapons = ({ weapons }) => (
  <Content className="weapons" title="weapons">
    {toList(weapons).map((weapon, i) => (
      <div key={i} className="content-row left">
        <span>{weapon.title}:</span>
        <span>
          <span style={{ marginRight: "3px" }}>Skill</span>
          <span>1d20</span>
          <span>+</span>
          <span>{weapon.skill || 0};</span>
        </span>
        <span>
          <span style={{ marginRight: "3px" }}>dmg</span>
          <span>{weapon.numberOfDice}</span>
          <span>d</span>
          <span>{weapon.diceSides}</span>
          <span>+</span>
          <span>{weapon.constant || 0};</span>
        </span>
        <span>
          <span style={{ marginRight: "3px" }}>Ini</span>
          <span>{weapon.initiative || 0};</span>
        </span>
      </div>
    ))}
  </Content>
);

const Specials = ({ specials }) => (
  <Content className="specials" title="specials">
    {specials.map((special, i) => (
      <div key={i} className="content-row">
        {special.title}
      </div>
    ))}
  </Content>
);
