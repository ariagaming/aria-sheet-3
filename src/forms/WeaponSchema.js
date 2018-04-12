import LongTextField from "uniforms-antd/LongTextField";
import SimpleSchema from "simpl-schema";
import { character } from "./../services/data-mock-character";

// extend the schema to include these options
//SimpleSchema.extendOptions(["options", "className"]);

const statisticFields = ["STR", "AGI", "INU", "PER"];
let StatisticsSchema = new SimpleSchema(
  statisticFields.reduce((acc, field) => {
    acc[field] = {
      type: SimpleSchema.Integer,
      optional: true,
      defaultValue: 0
    };
    return acc;
  }, {})
);

let DMGSchema = new SimpleSchema({
  numberOfDice: { type: SimpleSchema.Integer, defaultValue: 1 },
  diceSides: { type: SimpleSchema.Integer, defaultValue: 4 },
  constant: { type: SimpleSchema.Integer, defaultValue: 0 },
  initiative: { type: SimpleSchema.Integer, defaultValue: 10 }
});
let FeatsSchemaDefinition = {};
character.feats.forEach(feat => {
  FeatsSchemaDefinition[feat.title] = {
    type: SimpleSchema.Integer,
    defaultValue: 0,
    optional: true,
    label: feat.title
  };
});
let FeatSchema = new SimpleSchema(FeatsSchemaDefinition);

let SkillsSchemaDefinition = {};
character.skills.forEach(skill => {
  SkillsSchemaDefinition[skill.title] = {
    type: SimpleSchema.Integer,
    defaultValue: 0,
    optional: true,
    label: skill.title
  };
});
let SkillsSchema = new SimpleSchema(SkillsSchemaDefinition);

let baseSchema = {
  template: {
    type: String,
    allowedValues: ["Broadsword", "Longsword"],
    optional: true,
    uniforms: {
      options: [{ value: "bs", label: "Ballistic Skill" }]
    }
  },
  title: { type: String, label: "Name your weapon", defaultValue: "Dagger" },
  description: {
    type: String,
    optional: true,
    uniforms: { component: LongTextField }
  },
  active: { type: Boolean, defaultValue: false },
  damage: { type: DMGSchema, uniforms: { className: "dmg" } },
  isRanged: { type: Boolean, defaultValue: false },
  isTwoHanded: { type: Boolean, defaultValue: false },
  isShield: {
    type: Boolean,
    defaultValue: false,
    uniforms: { className: "is-shield" }
  },
  statistics: { type: StatisticsSchema, uniforms: { className: "statistics" } },
  feats: {
    type: FeatSchema,
    uniforms: { className: "feats" }
  },
  skills: {
    type: SkillsSchema,
    uniforms: { className: "feats" }
  }
};

const schema = new SimpleSchema(baseSchema);

export default schema;
