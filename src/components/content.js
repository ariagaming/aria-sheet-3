import React from "react";
import "./../styles/components/content.css";

export const Content = ({ className, children, title }) => (
  <div className={`content ${className}`}>
    {children}

    <div className="title">{title}</div>
  </div>
);

export const ContentStatistic = ({
  title = "movement",
  value = 100,
  prefix = "+",
  postfix = "%"
}) => (
  <Content className="content-statistic" title={title}>
    <div className="value">
      <div className="prefix">{prefix}</div>
      <div className="value-number">{value}</div>
      <div className="postfix">{postfix}</div>
    </div>
  </Content>
);
