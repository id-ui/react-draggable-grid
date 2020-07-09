import _ from 'lodash';
import produce from 'immer';

export const reorder = (list, startIndex, endIndex) =>
  produce(list, draft => {
    const [removed] = draft.splice(startIndex, 1);
    draft.splice(endIndex, 0, removed);
  });

const getIndex = id => parseInt(_.last(id.split(':')), 10);

export const reorderGrid = ({ data, getColumnItems, source, destination }) => {
  const sourceColumnIndex = getIndex(source.droppableId);
  const destinationColumnIndex = getIndex(destination.droppableId);

  return produce(data, draft => {
    const current = getColumnItems(draft[sourceColumnIndex]);
    const next = getColumnItems(draft[destinationColumnIndex]);

    const target = current[source.index];

    if (source.droppableId === destination.droppableId) {
      const [removed] = current.splice(source.index, 1);
      current.splice(destination.index, 0, removed);
    } else {
      current.splice(source.index, 1);
      next.splice(destination.index, 0, target);
    }
  });
};
