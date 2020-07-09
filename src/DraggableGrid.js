import React, {Component, useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { reorder, reorderGrid } from './helpers';

const dropContainerStyle = {
  width: '100%',
  height: '100%'
};

function DraggableGrid({
  data: providedData,
  getColumnItems,
  onChange,
  Container,
  Column,
  Item,
  isColumnDraggable,
  isItemDraggable,
  columnProps,
  itemProps
}) {
  const [data, setData] = useState(providedData);

  useEffect(() => {
    setData(providedData);
  }, [providedData]);

  const handleDragEnd = result => {
    const { source, destination } = result;
console.log(source, destination)
    if (
      !destination ||
      (source.droppableId === destination.droppableId &&
        source.index === destination.index)
    ) {
      return;
    }

    const newData =
      result.type === 'COLUMN'
        ? reorder(data, source.index, destination.index)
        : reorderGrid({
            data,
            getColumnItems,
            source,
            destination
          });

    setData(newData);
    onChange(newData);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="grid" type="COLUMN" direction="horizontal">
        {provided => (
          <Container ref={provided.innerRef} {...provided.droppableProps}>
            {data.map((column, columnIndex) => (
              <Draggable
                key={`column:${columnIndex}`}
                index={columnIndex}
                draggableId={`${columnIndex}`}
                isDragDisabled={!isColumnDraggable(column)}
              >
                {(provided, snapshot) => (
                  <Column
                    data={column}
                    innerRef={provided.innerRef}
                    draggableProps={provided.draggableProps}
                    dragHandleProps={provided.dragHandleProps}
                    snapshot={snapshot}
                    {...columnProps}
                  >
                    <Droppable
                      droppableId={`column:${columnIndex}`}
                      type="ITEM"
                    >
                      {dropProvided => (
                        <div
                          ref={dropProvided.innerRef}
                          style={dropContainerStyle}
                          {...dropProvided.droppableProps}
                        >
                          {getColumnItems(column).map((item, index) => (
                            <Draggable
                              key={`item:${columnIndex}:${index}`}
                              draggableId={`${columnIndex}:${index}`}
                              index={index}
                              isDragDisabled={!isItemDraggable(item)}
                            >
                              {(dragProvided, dragSnapshot) => (
                                <Item
                                  innerRef={dragProvided.innerRef}
                                  dragHandleProps={dragProvided.dragHandleProps}
                                  draggableProps={dragProvided.draggableProps}
                                  column={column}
                                  data={item}
                                  snapshot={dragSnapshot}
                                  {...itemProps}
                                />
                              )}
                            </Draggable>
                          ))}
                          {dropProvided.placeholder}
                        </div>
                      )}
                    </Droppable>
                  </Column>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </Container>
        )}
      </Droppable>
    </DragDropContext>
  );
}

const styledComponentShape = PropTypes.shape({render: PropTypes.func.isRequired});

DraggableGrid.propTypes = {
  /**
   * Accepts array
   * Array of columns data
   * @default div
   */
  data: PropTypes.array,
  /**
   * Accepts function
   * This function provided with column as argument and should return array of column items
   * @default (column) => column
   */
  getColumnItems: PropTypes.func,
  /**
   * Accepts function
   * This function is called when user has reordered grid
   * Grid data provided as argument
   * @default () => {}
   */
  onChange: PropTypes.func,
  /**
   * Accepts Component
   * DraggableGrid provides prop children
   * @default div
   */
  Container: PropTypes.oneOfType([PropTypes.func, PropTypes.element, styledComponentShape]),
  /**
   * Accepts Component or function
   * DraggableGrid provides the following props: { snapshot, draggableProps, dragHandleProps, innerRef, data, children }
   * snapshot, draggableProps, dragHandleProps - react-beautiful-dnd props
   * innerRef - react-beautiful-dnd ref
   * data - all provided column data from props
   * @default undefined
   */
  Column: PropTypes.oneOfType([PropTypes.func, PropTypes.element, styledComponentShape]).isRequired,
  /**
   * Accepts Component or function
   * DraggableGrid provides the following props: { snapshot, draggableProps, dragHandleProps, innerRef, data, children }
   * snapshot, draggableProps, dragHandleProps - react-beautiful-dnd props
   * innerRef - react-beautiful-dnd ref
   * data - all provided item data from props
   * @default undefined
   */
  Item: PropTypes.oneOfType([PropTypes.func, PropTypes.element, styledComponentShape]).isRequired,
  /**
   * Accepts function
   * This function provided with column as argument and should return flag meaning if column is draggable
   * @default () => true
   */
  isColumnDraggable: PropTypes.func,
  /**
   * Accepts function
   * This function provided with item as argument and should return flag meaning if item is draggable
   * @default () => true
   */
  isItemDraggable: PropTypes.func,
  /**
   * Accepts object
   * This object goes to props of column
   * @default {}
   */
  columnProps: PropTypes.object,
  /**
   * Accepts object
   * This object goes to props of item
   * @default {}
   */
  itemProps: PropTypes.object
};

function DefaultContainer({ children }) {
  return <div>{children}</div>;
}

DraggableGrid.defaultProps = {
  data: [],
  getColumnItems: _.identity,
  onChange: _.noop,
  isColumnDraggable: _.constant(true),
  isItemDraggable: _.constant(true),
  itemProps: {},
  columnProps: {},
  Container: DefaultContainer
};

export default DraggableGrid;
