import axios from "axios";
import urlAPI from "../../Supports/Constants/UrlAPI";
import { useEffect, useState } from "react";
import { useParams, Redirect } from "react-router-dom";

const Verification = () => {
  const [redirect, setRedirect] = useState(false);
  const [message, setMessage] = useState(
    "Please wait while we verify your account..."
  );

  const params = useParams();

  useEffect(() => {
    axios
      .patch(
        `${urlAPI}/users/verification/`,
        {},
        {
          headers: {
            authorization: `Bearer ${params.token}`,
          },
        }
      )
      .then((result) => {
        setRedirect(true);
        setMessage("Your account has been verified");
      })
      .catch((err) => console.log(err));
  }, []);

  if (redirect) {
    return <Redirect to="/login" />;
  }

  return (
    <div className="container p-5">
      <h1 className="text-center">{message}</h1>
    </div>
  );
};

export default Verification;
