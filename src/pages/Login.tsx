import { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Heading,
  Text,
  useToast,
  Container,
} from "@chakra-ui/react";
import { useAuthStore } from "../store";
import { mockService } from "../services/mockService";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("test@chat.com");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const { login, user: AuthUser } = useAuthStore();
  const navigate = useNavigate();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const user = await mockService.login(email, password);

      console.log(user);
      login(user);
      console.log({ user, AuthUser });

      navigate("/");
    } catch (error) {
      toast({
        title: "Error",
        description: "Invalid email or password",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container maxW="container.sm" py={10}>
      <Box
        p={8}
        borderWidth={1}
        borderRadius={8}
        boxShadow="lg"
        bg="white"
        _dark={{ bg: "gray.800" }}
      >
        <VStack spacing={4} align="stretch">
          <Heading textAlign="center">Welcome to Chat App</Heading>
          <Text textAlign="center" color="gray.500">
            Please sign in to continue
          </Text>
          <form onSubmit={handleSubmit}>
            <VStack spacing={4}>
              <FormControl isRequired>
                <FormLabel>Email</FormLabel>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="test@chat.com"
                  defaultValue={"test@chat.com"}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Password</FormLabel>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="123456"
                  defaultValue={"123456"}
                />
              </FormControl>
              <Button
                type="submit"
                colorScheme="blue"
                width="full"
                isLoading={isLoading}
              >
                Sign In
              </Button>
            </VStack>
          </form>
        </VStack>
      </Box>
    </Container>
  );
};

export default Login;
