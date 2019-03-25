import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { loadCourses, saveCourse } from '../../redux/actions/courseActions';
import { loadAuthors } from '../../redux/actions/authorActions';
import PropTypes from 'prop-types';
import CourseForm from './CourseForm';
import { newCourse } from '../../../tools/mockData';

function ManageCoursePage( { courses, authors, loadAuthors, loadCourses, saveCourse, history, ...props }) {
  const [course, setCourse] = useState({...props.course});
  const [errors, setErrors] = useState({});
  useEffect( () => {
    if (courses.length === 0 ) {
    loadCourses()
    .catch(error => {
      alert("Loading courses failed.." + error);
    });
  }

  if (authors.length === 0 ) {
  loadAuthors()
  .catch(error => {
    alert("Loading authors failed.." + error);
    });
  }
}, []);

function handleChange(event) {
  const { name, value } = event.target;
  setCourse(prevCourse => ({
    ...prevCourse,
    [name]: name === "authorId" ? parseInt(value, 10) : value
  }));
}

function handleSave(event) {
  event.preventDefault();
  saveCourse(course).then( () => {
    history.push("/courses");
  });
}

      return (
        <CourseForm
        course={course}
        errors={errors}
        authors={authors}
        onChange={handleChange}
        onSave={handleSave}
    />
  );
}

ManageCoursePage.propTypes = {
  authors: PropTypes.array.isRequred,
  course: PropTypes.object.isRequred,
  courses: PropTypes.array.isRequred,
  loadCourses: PropTypes.func.isRequred,
  loadAuthors: PropTypes.func.isRequred,
  saveCourse: PropTypes.func.isRequred,
  history: PropTypes.object.isRequred
};

export function getCourseBySlug(courses, slug) {
  return courses.find(course => course.slug === slug) || null;
}

function mapStateToProps(state, ownProps) {
  const slug = ownProps.match.params.slug;
  const course = slug && state.courses.length > 0
  ? getCourseBySlug(state.courses, slug)
  : newCourse;
  return {
    course: course,
    courses: state.courses,
    authors: state.authors
  };
}

const mapDispatchToProps = {
      loadCourses,
      loadAuthors,
      saveCourse
  };

export default connect(mapStateToProps, mapDispatchToProps)(ManageCoursePage);
