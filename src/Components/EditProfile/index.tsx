
import { useFormik } from "formik";
import * as Yup from "yup";
import cx from "classnames";
import { useDispatch, useSelector } from "react-redux";
import { ProfileService } from "../../Services/Profile";
import { setUser } from "../../Reducers/Auth";

const Schema = Yup.object().shape({
    first_name: Yup.string().required("Required"),
    last_name: Yup.string().required("Required"),
});

const EditProfile = () => {
    const user = useSelector((state) => state)
    const dispatch = useDispatch()
    const data = user as any

    const initialValues = {
        first_name: data.auth.user.profile.first_name,
        last_name: data.auth.user.profile.last_name
    }

    const formik = useFormik({
        initialValues,
        validateOnChange: false,
        validationSchema: Schema,
        onSubmit: async (
            values,
            { setFieldError, setSubmitting, resetForm }
        ) => {
            setSubmitting(true)
            const response = await ProfileService.editProfile(values.first_name, values.last_name);
            if(response){
                const user = response as any
                dispatch(setUser({user: {
                    _id: user._id,
                    accessToken: data.auth.user.accessToken,
                    email: user.email,
                    loggedIn: true,
                    profile: user.profile,
                    refreshToken: data.auth.user.refreshToken,
                    roles: user.roles
                }}))
            }
            setSubmitting(false)
        },
    });

    return (
        <form onSubmit={formik.handleSubmit}>
            <div>
                <label className="label">
                    <span className="label-text">First Name</span>
                </label>
                <input
                    disabled={formik.isSubmitting}
                    value={formik.values.first_name}
                    onChange={formik.handleChange("first_name")}
                    className={cx("input input-bordered w-full", {
                        "border-red-400": formik.errors.first_name,
                    })}
                />
                {formik.errors.first_name && (
                    <div className="text-red-500">{formik.errors.first_name}</div>
                )}
            </div>
            <div className="mt-5">
                <label className="label">
                    <span className="label-text">Last Name</span>
                </label>
                <input
                    disabled={formik.isSubmitting}
                    value={formik.values.last_name}
                    onChange={formik.handleChange("last_name")}
                    className={cx("input input-bordered w-full", {
                        "border-red-400": formik.errors.last_name,
                    })}
                />
                {formik.errors.last_name && (
                    <div className="text-red-500">{formik.errors.last_name}</div>
                )}
            </div>
            <div className="mt-5 flex justify-end">
                <button
                    className={cx("btn btn-primary", {
                        loading: formik.isSubmitting,
                    })}
                    type="submit"
                >
                    Save
                </button>
            </div>
        </form>
    );
};

export default EditProfile;
