import axios from "axios";

class MyAxios {
  postAxios = (url, data, cancelToken, onPost) => {
    axios
      .post(url, data, {
        cancelToken: cancelToken,
      })
      .then((response) => {
        onPost("success", response.data);
      })
      .catch((error) => {
        if (axios.isCancel(error)) {
          console.log("[CLASS] caught cancel filter");
          onPost("cancel", error);
        } else {
          onPost("error", error);
          // alert('error');
          console.log(error);
          // throw error;
        }
      });
  };

  getAxios = (url, cancelToken, onGet) => {
    axios
      .get(url, {
        cancelToken: cancelToken,
      })
      .then((response) => {
        onGet("success", response.data);
      })
      .catch((error) => {
        if (axios.isCancel(error)) {
          console.log("[CLASS] caught cancel filter");
          onGet("cancel", error);
        } else {
          onGet("error", error);
          throw error;
        }
      });
  };
}

export const myAxios = new MyAxios();
