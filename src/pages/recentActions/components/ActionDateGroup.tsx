import ActionHistoryItem from "@/pages/recentActions/components/ActionHistoryItem.tsx";

const ActionDateGroup = ({ date, actions }) => {
    return (
        <div className="flex flex-col gap-4">
            {actions.map((action, index) => (
                <ActionHistoryItem
                    key={`${date}-${index}`}
                    date={date}
                    action={action.action}
                    amount={action.amount}
                    user={action.user}
                    giftName={action.giftName}
                    giftImg={action.giftImg}
                />
            ))}
        </div>
    );
};

export default ActionDateGroup;