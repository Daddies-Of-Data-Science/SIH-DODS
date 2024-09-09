import React from "react";
import { useFormik } from "formik";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import * as Yup from "yup";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyArnHu3CEkbKMVeNBfJi1FLy0coAHRMeKE",
  authDomain: "sihdods.firebaseapp.com",
  projectId: "sihdods",
  storageBucket: "sihdods.appspot.com",
  messagingSenderId: "5653921433",
  appId: "1:5653921433:web:e532da0c68c37b21350208",
  measurementId: "G-PPBX7SVDEG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Validation schema using Yup
const validationSchema = Yup.object({
  title: Yup.string().required("Required"),
  description: Yup.string().required("Required"),
  authors: Yup.string().required("Required"),
  abstract: Yup.string().required("Required"),
  keywords: Yup.string().required("Required"),
  submissionDate: Yup.date().required("Required").nullable(),
});

const ProjectForm: React.FC = () => {
  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      authors: "",
      abstract: "",
      keywords: "",
      submissionDate: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        const docRef = await addDoc(collection(db, "projects"), values);
        console.log("Document written with ID: ", docRef.id);
        alert("Research Paper Submitted Successfully");
        resetForm(); // Reset the form fields
      } catch (e) {
        console.error("Error adding document: ", e);
        alert("Error submitting research paper. Please try again.");
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="w-full max-w-md mx-auto">
      <div className="mb-4">
        <label htmlFor="title" className="block text-gray-700 font-bold mb-2">
          Paper Title
        </label>
        <input
          id="title"
          name="title"
          type="text"
          className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${formik.touched.title && formik.errors.title ? 'border-red-500' : ''}`}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.title}
        />
        {formik.touched.title && formik.errors.title ? (
          <div className="text-red-500 text-xs mt-1">{formik.errors.title}</div>
        ) : null}
      </div>

      <div className="mb-4">
        <label htmlFor="description" className="block text-gray-700 font-bold mb-2">
          Paper Description
        </label>
        <textarea
          id="description"
          name="description"
          className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${formik.touched.description && formik.errors.description ? 'border-red-500' : ''}`}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.description}
        />
        {formik.touched.description && formik.errors.description ? (
          <div className="text-red-500 text-xs mt-1">{formik.errors.description}</div>
        ) : null}
      </div>

      <div className="mb-4">
        <label htmlFor="authors" className="block text-gray-700 font-bold mb-2">
          Authors
        </label>
        <input
          id="authors"
          name="authors"
          type="text"
          className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${formik.touched.authors && formik.errors.authors ? 'border-red-500' : ''}`}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.authors}
        />
        {formik.touched.authors && formik.errors.authors ? (
          <div className="text-red-500 text-xs mt-1">{formik.errors.authors}</div>
        ) : null}
      </div>

      <div className="mb-4">
        <label htmlFor="abstract" className="block text-gray-700 font-bold mb-2">
          Abstract
        </label>
        <textarea
          id="abstract"
          name="abstract"
          className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${formik.touched.abstract && formik.errors.abstract ? 'border-red-500' : ''}`}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.abstract}
        />
        {formik.touched.abstract && formik.errors.abstract ? (
          <div className="text-red-500 text-xs mt-1">{formik.errors.abstract}</div>
        ) : null}
      </div>

      <div className="mb-4">
        <label htmlFor="keywords" className="block text-gray-700 font-bold mb-2">
          Keywords
        </label>
        <input
          id="keywords"
          name="keywords"
          type="text"
          className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${formik.touched.keywords && formik.errors.keywords ? 'border-red-500' : ''}`}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.keywords}
        />
        {formik.touched.keywords && formik.errors.keywords ? (
          <div className="text-red-500 text-xs mt-1">{formik.errors.keywords}</div>
        ) : null}
      </div>

      <div className="mb-4">
        <label htmlFor="submissionDate" className="block text-gray-700 font-bold mb-2">
          Submission Date
        </label>
        <input
          id="submissionDate"
          name="submissionDate"
          type="date"
          className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${formik.touched.submissionDate && formik.errors.submissionDate ? 'border-red-500' : ''}`}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.submissionDate}
        />
        {formik.touched.submissionDate && formik.errors.submissionDate ? (
          <div className="text-red-500 text-xs mt-1">{formik.errors.submissionDate}</div>
        ) : null}
      </div>

      <button
        type="submit"
        className="bg-blue-600 text-white font-bold py-2 px-4 rounded hover:bg-blue-700"
      >
        Submit
      </button>
    </form>
  );
};

export default ProjectForm;
