import { Reorder, useDragControls, DragControls } from 'framer-motion';
import { ReactNode } from 'react';

interface DraggableItemProps<T> {
  value: T;
  children: (controls: DragControls) => ReactNode;
  className?: string;
}

export default function DraggableItem<T>({ value, children, className }: DraggableItemProps<T>) {
  const controls = useDragControls();
  return (
    <Reorder.Item value={value} dragListener={false} dragControls={controls} className={className}>
      {children(controls)}
    </Reorder.Item>
  );
}
