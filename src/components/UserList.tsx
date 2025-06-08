import { VStack, Box, HStack, Text, Avatar } from "@chakra-ui/react";
import type { User } from "../types";

interface UserListProps {
  users: User[];
  onUserClick: (userId: string) => void;
}

const UserList = ({ users, onUserClick }: UserListProps) => {
  return (
    <VStack spacing={4} align="stretch">
      {users.map((user) => (
        <Box
          key={user.id}
          p={4}
          borderWidth={1}
          borderRadius="md"
          cursor="pointer"
          _hover={{ bg: "gray.50" }}
          _dark={{ _hover: { bg: "gray.700" } }}
          onClick={() => onUserClick(user.id)}
        >
          <HStack spacing={4}>
            <Avatar name={user.name} src={user.avatar} size="md" />
            <Box flex={1}>
              <Text fontWeight="bold">{user.name}</Text>
              <Text fontSize="sm" color="gray.500">
                {user.isOnline ? "Online" : "Offline"}
              </Text>
            </Box>
          </HStack>
        </Box>
      ))}
    </VStack>
  );
};

export default UserList;
