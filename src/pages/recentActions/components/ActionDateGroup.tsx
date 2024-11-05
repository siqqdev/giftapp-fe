import React from 'react';
import ActionHistoryItem from "@/pages/recentActions/components/ActionHistoryItem.tsx";
import {IActionHistoryItem} from "@/inerfaces/interfaces.ts";

interface ActionDateGroupProps {
    date: string;
    actions: IActionHistoryItem[];
}

const ActionDateGroup: React.FC<ActionDateGroupProps> = ({ date, actions }) => {
    return (
        <div className="flex flex-col gap-4">
            {actions.map((action, index) => (
                <ActionHistoryItem
                    {...action}
                />
            ))}
        </div>
    );
};

export default ActionDateGroup;