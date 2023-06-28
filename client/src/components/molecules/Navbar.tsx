import NiceModal from "@ebay/nice-modal-react";
import { IconPlus } from "@tabler/icons-react";

import { Logo } from "../atoms/Logo";
import { CreateStreamerModal } from "../modals/CreateStreamerModal";
import { Button } from "../ui/Button";
import { Container } from "../ui/Container";

export function Navbar() {
  return (
    <div className="bg-zinc-900">
      <Container>
        <div className="relative flex items-center justify-between h-16">
          <div className="flex items-center justify-center sm:items-stretch sm:justify-start">
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
