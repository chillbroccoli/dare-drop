import NiceModal from "@ebay/nice-modal-react";
import { IconMenu2, IconPlus } from "@tabler/icons-react";

import { Logo } from "../atoms/Logo";
import { CreateStreamerModal } from "../modals/CreateStreamerModal";
import { Button } from "../ui/Button";
import { Container } from "../ui/Container";

export function Navbar() {
  return (
    <div className="bg-zinc-900">
      <Container>
        <div className="relative flex items-center justify-between h-16">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <button className="inline-flex items-center justify-center p-2 text-gray-400 rounded-md hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
              <span className="sr-only">Open main menu</span>
              <IconMenu2 />
            </button>
          </div>
          <div className="items-center justify-center flex-1 hidden sm:items-stretch sm:justify-start sm:flex">
            <div className="flex items-center flex-shrink-0">
              <Logo />
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <div className="flex-shrink-0">
              <Button
                size="lg"
                onClick={() => NiceModal.show(CreateStreamerModal)}
              >
                <IconPlus className="w-5 h-5 mr-1" aria-hidden="true" />
                <span>Add Streamer</span>
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
