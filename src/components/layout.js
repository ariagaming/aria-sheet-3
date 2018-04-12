import React from "react";
import PropTypes from "prop-types";
import "./../styles/components/layout.css";

export const StackPanel = ({
  children,
  className,
  orientation = "row",
  style,
  ...props
}) => {
  const _style = {
    display: "flex",
    flexDirection: orientation,
    ...style
  };
  return (
    <div style={_style} {...props} className={`ck-stackpanel ${className}`}>
      {children}
    </div>
  );
};

export const Row = ({ children, ...props }) => (
  <StackPanel className="ck-row" orientation="row" {...props}>
    {children}
  </StackPanel>
);

Row.propTypes = {
  name: PropTypes.string
};

export const Column = ({ children, ...props }) => (
  <StackPanel className="ck-column" orientation="column" {...props}>
    {children}
  </StackPanel>
);

export const Content = ({ children, ...props }) => (
  <div className="ck-content" {...props}>
    {children}
  </div>
);

export const List = ({
  items = [],
  onSelect = () => {},
  ItemTemplate,
  ...props
}) => {
  return (
    <ul className="ck-list">
      {items.map(
        (item, i) =>
          ItemTemplate ? (
            <ItemTemplate onSelect={onSelect} key={i} item={item} />
          ) : (
            <li
              key={i}
              onClick={() => {
                onSelect(item, i, items);
              }}
            >
              {item.title || item.label || item}
            </li>
          )
      )}
    </ul>
  );
};

const filterListPredicate = search => item =>
  (item.title || item.label || item).toLowerCase().indexOf(search) > -1;

export class FilterableList extends React.Component {
  state = {};
  render() {
    const {
      items = [],
      ItemTemplate,
      className,
      onSelect,
      ...props
    } = this.props;
    const { search = "" } = this.state;
    return (
      <div className={"ck-filterable-list " + className || ""}>
        <div className="ck-list-search">
          <input
            value={search}
            onChange={e => {
              this.setState({
                ...this.state,
                search: e.target.value.toLowerCase()
              });
            }}
          />
        </div>
        <List
          items={items.filter(filterListPredicate(search))}
          ItemsTemplate={ItemTemplate}
          onSelect={onSelect}
        />
      </div>
    );
  }
}

export const DetailsForm = ({ item, title, config }) => {
  const keys = Object.keys(config);
  return (
    <div className="ck-details-form">
      {title ? <h2>{title}</h2> : null}
      {keys.map((key, i) => {
        const c = config[key];
        const Comp = c.Component;
        if (Comp) {
          return <Comp item={item} field={key} config={c} />;
        } else if (c.type === String) {
          return <DetailsString key={i} item={item} field={key} config={c} />;
        } else if (c.type === Boolean) {
          return <DetailsBoolean key={i} item={item} field={key} config={c} />;
        } else {
          return <DetailsDefault key={i} item={item} field={key} config={c} />;
        }
      })}
    </div>
  );
};
const DetailsDefault = ({ item, field, config }) => {
  return (
    <div className="ck-details-field">
      <span className="title">{config.title || field}:</span>
      <span>{item[field] || ""}</span>
    </div>
  );
};
const DetailsBoolean = ({ item, field, config }) => {
  return (
    <div className="ck-details-field">
      <span className="title">{config.title || field}:</span>
      <span>{item[field] ? "true" : "false"}</span>
    </div>
  );
};
const DetailsString = ({ item, field, config }) => {
  return (
    <div className="ck-details-field">
      <span className="title">{config.title || field}:</span>
      <span>{item[field] || ""}</span>
    </div>
  );
};

export const EditForm = ({ item, title, config, onChange = () => {} }) => {
  const keys = Object.keys(config);
  return (
    <div className="ck-form">
      {title ? <h2>{title}</h2> : null}
      {keys.map((key, i) => {
        const c = config[key];
        const Comp = c.Component;
        if (Comp) {
          return (
            <Comp item={item} field={key} config={c} onChange={onChange} />
          );
        } else if (c.type === String) {
          return (
            <StringEdit
              key={i}
              item={item}
              field={key}
              config={c}
              onChange={onChange}
            />
          );
        } else if (c.type === Boolean) {
          return (
            <DetailsBoolean
              key={i}
              item={item}
              field={key}
              config={c}
              onChange={onChange}
            />
          );
        } else {
          return (
            <DetailsDefault
              key={i}
              item={item}
              field={key}
              config={c}
              onChange={onChange}
            />
          );
        }
      })}
    </div>
  );
};
const StringEdit = ({ item, field, config, onChange = () => {} }) => {
  let value = item[field] || "";
  return (
    <div className="ck-details-field">
      <label className="title">{config.title || field}:</label>
      <input
        value={value}
        onChange={e => onChange(field, e.target.value, value)}
      />
    </div>
  );
};

const formStates = {
  details: "details",
  edit: "edit"
};
export class MasterDetailForm extends React.Component {
  state = { formState: "details" };
  selectItem = item => {
    this.setState({
      ...this.state,
      selectedItem: item,
      originalItem: { ...item }
    });
  };
  render() {
    const {
      items = [],
      config,
      ItemTemplate,
      DetailsTemplate,
      onSubmit,
      ...props
    } = this.props;

    const item = this.state.selectedItem;
    const formState = this.state.formState;

    return (
      <Row className="ck-details-form">
        <FilterableList
          items={items}
          ItemTemplate={ItemTemplate}
          onSelect={this.selectItem}
        />
        <Content>
          <Column>
            <Row>
              <button
                onClick={() => {
                  this.setState({
                    ...this.state,
                    formState:
                      this.state.formState === formStates.details
                        ? formStates.edit
                        : formStates.details
                  });
                }}
              >
                Edit
              </button>
              <button
                onClick={() => {
                  this.setState({
                    ...this.state,
                    formState: formStates.details,
                    selectedItem: this.state.originalItem
                  });
                }}
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  onSubmit();

                  //   this.setState({
                  //     ...this.state,
                  //     formState: formStates.details,
                  //     selectedItem: this.state.originalItem
                  //   });
                }}
              >
                Save
              </button>
            </Row>
            {item &&
              (() => {
                if (formState === formStates.details) {
                  return (
                    <DetailsForm
                      title="Weapon details"
                      item={item}
                      config={config}
                    />
                  );
                } else if (formState === formStates.edit) {
                  return (
                    <EditForm
                      title="Weapon details"
                      item={item}
                      config={config}
                      onChange={(field, newValue, oldValue) => {
                        this.setState({
                          ...this.state,
                          selectedItem: {
                            ...item,
                            [field]: newValue
                          }
                        });
                      }}
                    />
                  );
                } else {
                  return <div>Nothing selected</div>;
                }
              })()}
          </Column>
        </Content>
      </Row>
    );
  }
}
