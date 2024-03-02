import EmptyState from "../../globalComponents/EmptyState";
import { FaMapMarkerAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function ArenasList() {
  const navigate = useNavigate();

  return (
    <>
      <h1 className="text-6xl font-bold text-primary mb-2">Arenas</h1>
      <p className="mb-4 text-lg text-gray-600">
        Manage and create arenas where tournaments will take place. Start by
        adding a new arena to get started.
      </p>
      <EmptyState
        title="No Arenas"
        content="Lets Create some Arenas!"
        buttonText="Create Arena"
        buttonIcon={<FaMapMarkerAlt size={16} />}
        buttonFunction={() => {
          navigate("create");
        }}
      />
    </>
  );
}
