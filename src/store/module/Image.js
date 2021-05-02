import http from "../../http-common";
const imageManagement = {
  state: {
    images: [],
  },
  getters: {
    getImage: (state) => {
      return state.images;
    },
  },
  mutations: {
    setImage(state, images) {
      state.images = images;
    },
  },
  actions: {
    getAllImage(context) {
      http.get(`/images/all`).then((response) => {
        let images = response.data;
        context.commit("setImage", images);
      });
    },
    async deleteImageByEmail(context, tutor) {
      const response = await http.delete(`/images/owner-email/${tutor.email}`);
      if (response.status == 204) {
        const responseUpdateImage = await context.dispatch(
          "updateImageByEmail",
          tutor
        );
        context.dispatch("getAllImage");
        return responseUpdateImage;
      }
      return response.status;
    },
    async updateImageByEmail(context, tutor) {
      var listImage = tutor.certificateImages
        .trim("")
        .slice(1, tutor.certificateImages.length - 1)
        .split(",");
      let listResponse = [];
      for (let image of listImage) {
        const response = await http.post(`/images`, {
          imageLink: image,
          imageType: "certification",
          ownerEmail: tutor.email,
        });
        listResponse.push(response.status);
      }
      return listResponse;
    },
  },
};
export default imageManagement;
