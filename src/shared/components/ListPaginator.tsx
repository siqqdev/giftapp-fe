import React, { ReactNode, UIEvent, useCallback, useRef, useState } from 'react';

interface ListPaginatorProps {
    className?: string;
    onBottomReached: () => void;
    children: ReactNode;
}

export default function ListPaginator({
                                          children,
                                          className = '',
                                          onBottomReached,
                                      }: ListPaginatorProps) {
    const ref = useRef<HTMLDivElement | null>(null);
    const [scrollHeight, setScrollHeight] = useState(0);

    const trackScrolling = useCallback(
        (event: UIEvent<HTMLDivElement>): void => {
            const container = event.target as HTMLDivElement;

            if (Math.abs(container.scrollHeight - container.clientHeight - container.scrollTop) < 100) {
                if (scrollHeight !== container.scrollHeight) {
                    setScrollHeight(container.scrollHeight);
                    onBottomReached();
                }
            }
        },
        [onBottomReached, scrollHeight]
    );

    return (
        <div
            ref={ref}
            className={['w-full overflow-y-scroll pb-safe', className].join(' ')}
            onScroll={trackScrolling}
        >
            {children}
        </div>
    );
}