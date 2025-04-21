// src/components/GroupList.tsx
import React from "react";
import { List, ListItem, ListItemText } from "@mui/material";
import { Group } from "../types/Group";

interface GroupListProps {
  groups: Group[];
  onSelectGroup: (groupId: number) => void;
  selectedGroupId: number; // 🔧 Added this
}

const GroupList: React.FC<GroupListProps> = ({
  groups,
  onSelectGroup,
  selectedGroupId,
}) => {
  return (
    <List>
      {groups.map((group) => (
        <ListItem
          key={group.id}
          button
          onClick={() => onSelectGroup(group.id)}
          selected={group.id === selectedGroupId}
        >
          <ListItemText primary={group.name} />
        </ListItem>
      ))}
    </List>
  );
};

export default GroupList;
