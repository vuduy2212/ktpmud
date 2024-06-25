import axios from 'axios';

export const getProfileDoctor = async (id) => {
    const response = await axios.get(`/api/doctor/get-profile/${id}`);
    return response.data;
};

export const updateProfileDoctor = async (axiosJWT, user, profileUpdated) => {
    try {
        const res = await axiosJWT.patch(`/api/doctor/update-profile/${user.id}`, profileUpdated, {
            headers: { token: `Bearer ${user.accessToken}` },
        });
    } catch (error) {
        throw new Error('Fetch Error');
    }
};

export const getDetailDoctor = async (id) => {
    const response = await axios.get(`/api/doctor/get-detail-doctor/${id}`);
    if (response.data === null) {
        return {};
    }
    return response.data;
};

export const getAllDoctorOneSpecialist = async (id) => {
    const response = await axios.get(`/api/doctor/get-all-one-specialist/${id}`);
    return response.data;
};
export const getAllDoctorOneClinic = async (id) => {
    const response = await axios.get(`/api/doctor/get-all-one-clinic/${id}`);
    return response.data;
};
