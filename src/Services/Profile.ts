import { RequestService } from "./Request";

const editProfile = (first_name: string, last_name: string) => {
    return RequestService.put(`/profile/edit`, {
        first_name,
        last_name,
    });
};

export const ProfileService = {
    editProfile
}