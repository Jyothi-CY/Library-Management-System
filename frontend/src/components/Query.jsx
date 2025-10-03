import { useBookContext } from "../hooks/useBookContext";
import { AuthContext } from "../context/AuthContext";
import { useLocation, Link } from "react-router-dom";
import { useState, useContext } from "react";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
  Chip, 
  Card, CardHeader, CardBody, CardFooter, Divider, Image
} from "@nextui-org/react";
import { toast } from "sonner";

export default function Query() {
  const { state, dispatchb } = useBookContext();
  const { state: authState } = useContext(AuthContext);
  const { user } = authState;
  const location = useLocation();
  const bookId = location.pathname.split("/")[2];
  const book = state.books.find((book) => book._id == bookId);
  const queries  = book.queries;
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [backdrop, setBackdrop] = useState("blur");
  const [query, setQuery] = useState("");

  const handleOpen = (backdrop) => {
    setBackdrop(backdrop);
    onOpen();
  };

  const handleAsk = async (onClose) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/books/${bookId}/query`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "authorization": `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ user_name: user.username, query }),
        }
      );
      if (!response.ok) {
        toast.error("Failed to add query");
        return;
      }
      const data = await response.json();
      dispatchb({ type: "ADD_QUERY", payload: { bookId, query: data } });
      setQuery("");
      toast.success("Query added successfully");
      onClose();
    } catch (error) {
      toast.error("Failed to add query");
    }
  };
  // return a card with queries and answers in a list
  return (
    <>
      <Card className="m-8">
        <CardHeader>
          Queries
        </CardHeader>
        <CardBody>
          {queries.map((query) => (
            <div key={query._id} className="flex flex-col m-2 p-2">
              <Chip color="primary" size="sm" className="font-serif">{query.user_name}</Chip>
              <p className="text-lg">{query.query}</p>
              <Divider />
              <Button color="success" variant="flat" className="mt-2"

              >
                <Link to={`/books/${bookId}/query/${query._id}`}>
                  View Answers
                </Link>
              </Button>

            </div>
          ))}
        </CardBody>
      </Card>
      
      <Button
        className="fixed bottom-4 right-4"
        color="primary"
        onPress={() => handleOpen("Ask Query")}
      >
        Ask Query
      </Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="center"
        backdrop="blur"
        
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>
                Ask a Query
              </ModalHeader>
              <ModalBody>
                <Input
                  autoFocus
                  label="Query"
                  placeholder="Enter your Query"
                  variant="bordered"
                  size="lg"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Close
                </Button>
                <Button
                  color="secondary"
                  onPress={() => {
                    handleAsk(onClose);
                  }}
                >
                  Ask
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
