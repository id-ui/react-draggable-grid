# Draggable Grid React Component

### [Docs here](https://kseniya57.github.io/react-draggable-grid?path=/docs/mdx-draggablegrid--page)

[![NPM](https://img.shields.io/npm/v/@kaprisa57/react-draggable-grid.svg)](https://www.npmjs.com/package/@kaprisa57/react-draggable-grid) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save @kaprisa57/react-draggable-grid
```

```bash
yarn add @kaprisa57/react-draggable-grid
```

## Example

```jsx
import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import DraggableGrid from '@kaprisa57/react-draggable-grid';

const randomIndex = max => Math.floor(Math.random() * (max + 1));

const fakeData = Array.from({ length: 10 }, (el, columnIndex) => ({
  id: columnIndex + 1,
  title: `Column ${columnIndex + 1}`,
  children: Array.from({ length: randomIndex(30) }, (childEl, childIndex) => ({
    id: childIndex + 1,
    title: `Item ${childIndex + 1}`
  }))
}));

function  Grid() {
    const [data, setData] = useState(fakeData)
    
    const handleChange = useCallback((newData) => {
        setData(newData)
    }, [])
    
    return (
        <DraggableGrid
            getColumnItems={column => column.children}
            data={data}
            Container={Container}
            Column={Column}
            Item={Item}
            onChange={handleChange}
        />
    )
}

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
```

### [Docs here](https://kseniya57.github.io/react-draggable-grid?path=/docs/mdx-draggablegrid--page)

## License

MIT © [kaprisa57@gmail.com](https://github.com/kaprisa57@gmail.com)
