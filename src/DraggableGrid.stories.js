import React from 'react';
import styled from 'styled-components';
import { withA11y } from '@storybook/addon-a11y';
import { withPropsTable } from 'storybook-addon-react-docgen';
import { action } from '@storybook/addon-actions';
import { withKnobs } from '@storybook/addon-knobs';
import centered from '@storybook/addon-centered/react';
import DraggableGrid from './DraggableGrid';

export default {
  title: 'DraggableGrid',
  decorators: [withA11y, withKnobs, withPropsTable, centered],
  parameters: {
    props: {
      propTablesInclude: [DraggableGrid]
    }
  }
};

const Container = styled.div`
  overflow-x: auto;
  display: flex;
  margin: 0 30px;
`;

const StyledColumn = styled.div`
  min-width: 270px;
  width: 270px;
  margin: 0 4px;
  padding: 8px;
  background-color: #a79f9f;
  border-radius: 3px;
  height: calc(100vh - 30px);
  display: flex;
  flex-direction: column;
  & > * {
    width: 100%;
  }
`;

const ColumnContent = styled.div`
  overflow-y: auto;
  flex: 1;
  min-height: 0;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const StyledItem = styled.div`
  min-height: 50px;
  padding: 6px 8px 2px;
  background-color: #ffffff;
  border-radius: 3px;
  cursor: pointer;
  margin-bottom: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  &:hover {
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
  }
`;

const ColumnTitle = styled.div`
  padding: 1rem 0;
  margin-bottom: 5px;
  font-size: 16px;
  color: #000000;
  font-weight: 600;
`;

const randomIndex = max => Math.floor(Math.random() * (max + 1));

const data = Array.from({ length: 10 }, (el, columnIndex) => ({
  id: columnIndex + 1,
  title: `Column ${columnIndex + 1}`,
  children: Array.from({ length: randomIndex(30) }, (childEl, childIndex) => ({
    id: childIndex + 1,
    title: `Item ${childIndex + 1}`
  }))
}));

function Item({ data, innerRef, draggableProps, dragHandleProps }) {
  return (
    <StyledItem ref={innerRef} {...draggableProps} {...dragHandleProps}>
      {data.title}
    </StyledItem>
  );
}

function Column({ data, children, innerRef, draggableProps, dragHandleProps }) {
  return (
    <StyledColumn ref={innerRef} {...draggableProps}>
      <ColumnTitle {...dragHandleProps}>{data.title}</ColumnTitle>
      <ColumnContent>{children}</ColumnContent>
    </StyledColumn>
  );
}

export const example = () => (
  <DraggableGrid
    getColumnItems={column => column.children}
    data={data}
    Container={Container}
    Column={Column}
    Item={Item}
    onChange={action('onChange')}
  />
);
