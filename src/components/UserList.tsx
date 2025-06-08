import {
  Box,
  VStack,
  HStack,
  Text,
  Checkbox,
  Avatar,
  Flex,
  IconButton,
} from "@chakra-ui/react";
import type { User } from "../types";
import { CiCircleCheck, CiCircleRemove } from "react-icons/ci";
import { FiArrowDownRight, FiArrowRight, FiPlus } from "react-icons/fi";

interface UserListProps {
  users: User[];
  onUserClick: (userId: string) => void;
  onUserSelect: (userId: string) => void;
  selectedUsers: string[];
}

const UserList = ({
  users,
  onUserClick,
  onUserSelect,
  selectedUsers,
}: UserListProps) => {
  return (
    <VStack spacing={4} align="stretch">
      {users.map((user) => (
        <HStack
          key={user.id}
          p={4}
          borderWidth={1}
          borderRadius="md"
          cursor="pointer"
          _hover={{ bg: "gray.50" }}
          justify="space-between"
        >
          <HStack spacing={4}>
            <Avatar name={user.name} src={user.avatar} />
            <Box>
              <HStack>
                {" "}
                <IconButton
                  aria-label="Toggle color mode"
                  icon={user.isOnline ? <CiCircleCheck /> : <CiCircleRemove />}
                  variant="ghost"
                  h={4}
                  w={4}
                  minWidth={0}
                />
                <Text fontWeight="bold">{user.name}</Text>
              </HStack>
              <Text fontSize="sm" color="gray.500">
                {user.email}
              </Text>
            </Box>
          </HStack>
          <HStack>
            <Checkbox
              isChecked={selectedUsers.includes(user.id)}
              onChange={(e) => {
                e.stopPropagation();
                onUserSelect(user.id);
              }}
            />
            <IconButton
              aria-label="Toggle color mode"
              icon={<FiArrowRight />}
              variant="ghost"
              h={4}
              w={4}
              minWidth={0}
              onClick={() => onUserClick(user.id)}
            />
          </HStack>
        </HStack>
      ))}
    </VStack>
  );
};

export default UserList;
