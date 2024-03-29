import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ACCOUNT_TYPE } from "../../../utils/constants";
import { addToCart } from "../../../slices/cartSlice";
import copy from "copy-to-clipboard";
import { toast } from "react-hot-toast";
import { FaShareSquare } from "react-icons/fa";
import { BsFillCaretRightFill } from "react-icons/bs";
function CourseDetailsCard({ course, setConfirmationModal, handleBuyCourse }) {
  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    thumbnail: ThumbnailImage,
    price: CurrentPrice,
    _id: courseId,
  } = course;

  const handleAddToCart = () => {
    if (user && user?.accountType === ACCOUNT_TYPE.INSTRUCTOR) {
      toast.error("Instructor cann't buy a course");
      return;
    }
    if (token) {
      console.log("Your course dispatched to the cart");
      dispatch(addToCart(course));
      return;
    }
    setConfirmationModal({
      text1: "You are not logged in!!!",
      text2: "Please login to add to cart",
      btn1text: "Login",
      btn2Text: "Cancel",
      btn1Handler: () => navigate("/login"),
      btn2Handler: () => setConfirmationModal(null),
    });
  };
  const handleShare = () => {
    copy(window.location.href);
    toast.success("Link Copied to Clipboard");
  };

  return (
    <div
      className={` flex flex-col gap-4 py-2 rounded-md bg-richblack-700 p-4 text-richblack-5`}
    >
      <img
        src={ThumbnailImage}
        alt="Thumbnail Image"
        className="max-h-[300px] min-h-[180px] w-[400px] overflow-hidden rounded-2xl object-cover md:max-w-full"
      />
      <div className="px-4">
        <div className="space-x-3 pb-4 text-3xl font-semibold">
          Rs. {CurrentPrice}
        </div>
        <div className="flex flex-row  gap-x-8  ">
          <button
            className="bg-yellow-50 text-richblack-900  px-2 border-spacing-1  shadow-yellow-100 shadow-lg hover:rounded-lg  py-1   "
            // className="yellowButton"
            onClick={
              user && course?.studentsEnrolled.includes(user?._id)
                ? () => navigate("/dashboard/enrolled-courses")
                : handleBuyCourse
            }
          >
            {user && course?.studentsEnrolled.includes(user?._id)
              ? "Go to Course "
              : "Buy Now"}
          </button>

          {(!user || !course?.studentsEnrolled.includes(user?._id)) && (
            <button
              onClick={handleAddToCart}
              className="bg-richblue-800 mx-auto text-richblack-50 font semibold px-2 border-spacing-1  shadow-richblack-200 shadow-lg hover:rounded-lg  py-1 "
            >
              Add to Cart
            </button>
          )}
        </div>

        <div className={``}>
          <p className={`my-2 text-xl font-semibold `}>This Course Includes:</p>
          <div className="flex flex-col gap-3 text-sm text-caribbeangreen-100">
            {course?.instructions?.map((item, index) => {
              return (
                <p key={index} className="flex gap-2">
                  <BsFillCaretRightFill />
                  <span>{item}</span>
                </p>
              );
            })}
          </div>
        </div>
        <div className="text-center">
          <button
            className="mx-auto flex items-center gap-2 p-6 text-yellow-50"
            onClick={handleShare}
          >
            <FaShareSquare size={15} /> Share
          </button>
        </div>
      </div>
    </div>
  );
}
export default CourseDetailsCard;
