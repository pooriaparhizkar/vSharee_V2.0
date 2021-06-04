import { GroupType } from '../../../interface';

export interface CreateGroupModalProps {
    show: boolean;
    onClose: () => void;
    data?: GroupType;
}
