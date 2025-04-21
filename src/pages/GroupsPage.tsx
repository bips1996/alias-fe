import React, { useState } from "react";
import { Container, Typography, Paper, Dialog } from "@mui/material";
import GroupList from "../components/GroupList";
import GroupChatWindow from "../components/GroupChatWindow";
import GroupDetails from "../components/GroupDetails"; // NEW
import { Message } from "../types/Message";
import { Group } from "../types/Group";

const dummyGroups: Group[] = [
  {
    id: 1,
    name: "Family",
    description: "Family chat group",
    members: [
      { id: 1, name: "Alice", avatarUrl: "" },
      { id: 2, name: "Bob", avatarUrl: "" }
    ]
  },
  {
    id: 2,
    name: "Work",
    description: "Work discussions",
    members: [
      { id: 3, name: "Charlie", avatarUrl: "" },
      { id: 4, name: "Diana", avatarUrl: "" }
    ]
  }
];

const dummyMessages = [
  { from: 1, text: "Hey team!", status: "seen" },
  { from: 3, text: "Good morning!", status: "delivered" }
];

const GroupsPage: React.FC = () => {
  const [groups, setGroups] = useState(dummyGroups);
  const [selectedGroup, setSelectedGroup] = useState(dummyGroups[0]);
  const [messages, setMessages] = useState(dummyMessages);
  const [input, setInput] = useState("");
  const [incognitoMode, setIncognitoMode] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  const handleGroupSelect = (groupId: number) => {
    const selected = groups.find((group) => group.id === groupId);
    if (selected) setSelectedGroup(selected);
  };

  const handleSendMessage = () => {
    if (input.trim()) {
      setMessages([...messages, { from: 1, text: input, status: "sent" }]);
      setInput("");
    }
  };

  const handleSaveGroupDetails = (updatedGroup: Group) => {
    //     id: number;
    // name: string;
    // description?: string;
    // members: Member[];

    const updatedGroups = groups.map((g) => (g.id === updatedGroup.id ? updatedGroup : g));
    setGroups(updatedGroups);
    setSelectedGroup(updatedGroup);
    setShowDetails(false);
  };

  return (
    <Container sx={{ display: "flex", height: "85vh", mt: 2 }}>
      {/* Group List */}
      <Paper elevation={3} sx={{ width: "25%", p: 2, mr: 2, overflowY: "auto" }}>
        <Typography variant="h6" gutterBottom>
          Groups
        </Typography>
        <GroupList
          groups={groups}
          onSelectGroup={handleGroupSelect}
          selectedGroupId={selectedGroup.id}
        />
      </Paper>

      {/* Chat Window */}
      <Paper
        elevation={3}
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          p: 2,
          bgcolor: incognitoMode ? "#121212" : "white",
          color: incognitoMode ? "white" : "inherit"
        }}
      >
        <GroupChatWindow
          groupName={selectedGroup.name}
          users={selectedGroup.members}
          messages={messages as Message[]}
          input={input}
          onInputChange={setInput}
          onSend={handleSendMessage}
          incognitoMode={incognitoMode}
          setIncognitoMode={setIncognitoMode}
          onEditGroup={() => setShowDetails(true)} // Open popup
        />
      </Paper>

      {/* Group Details Dialog */}
      <Dialog open={showDetails} onClose={() => setShowDetails(false)} fullWidth maxWidth="sm">
        <GroupDetails
          group={selectedGroup}
          onSave={handleSaveGroupDetails}
          onClose={() => setShowDetails(false)}
        />
      </Dialog>
    </Container>
  );
};

export default GroupsPage;
