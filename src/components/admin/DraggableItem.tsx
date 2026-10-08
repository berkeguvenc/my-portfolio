import { Reorder, useDragControls, DragControls } from 'framer-motion';
import { ReactNode } from 'react';

interface DraggableItemProps {
  value: any;
  children: (controls: DragControls) => ReactNode;
  className?: string;
}

export default function DraggableItem({ value, children, className }: DraggableItemProps) {
  const controls = useDragControls();
  return (
    <Reorder.Item value={value} dragListener={false} dragControls={controls} className={className}>
      {children(controls)}
    </Reorder.Item>
  );
}
