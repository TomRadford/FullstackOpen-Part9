interface HeaderProps {
  name: string
}
const Header = ({name}: HeaderProps ) => {
 return (
  <h1>{name}</h1>
 );
};

interface CoursePartBase {
  name: string;
  exerciseCount: number;
  type: string
}

// interfaces with same name can merge!
// interface CoursePartBase {
//   thisWillExtendTheAbove?: string
// }

interface CoursePartDescription extends CoursePartBase {
  description: string
}

interface CourseNormalPart extends CoursePartDescription {
  type: "normal";
}

interface CourseProjectPart extends CoursePartBase {
  type: "groupProject";
  groupProjectCount: number
}

interface CourseSubmissionPart extends CoursePartDescription {
  type: "submission";
  exerciseSubmissionLink: string;
}

interface CourseSpecialPart extends CoursePartDescription {
  type: "special";
  requirements: string[]
}

type CoursePart = CourseNormalPart | CourseProjectPart | CourseSubmissionPart | CourseSpecialPart;

interface PartProps {
  part: CoursePart
}

const Part = ({part}:PartProps) => {
  //switch-based exhaustive type checking
  switch (part.type) {
    case "normal": 
    return (<div>
      <strong>{part.name} {part.exerciseCount}</strong>
      <p>{part.description}</p>
      </div>);
    case "groupProject":
    return (<div>
      <strong>{part.name} {part.exerciseCount}</strong>
      <p>project exercises {part.groupProjectCount}</p>
    </div>);
    case "submission":
    return (<div>
      <strong>{part.name} {part.exerciseCount}</strong>
      <p>{part.description}</p>
      <p>submit to {part.exerciseSubmissionLink}</p>
    </div>);
    case "special": 
    return (<div>
      <strong>{part.name} {part.exerciseCount}</strong>
      <p>{part.description}</p>
      <p>required skills {part.requirements.map(req => `${req}, `)}</p>
    
    </div>);
    default: 
    assertNever(part);
    return <></>;
  }
  
};

interface ContentProps {
  parts: Array<CoursePart>
}

const Content = ({parts}:ContentProps) => {
  return (
    <>
    {parts.map(part => <Part key={part.name} part={part} />)}
    </>
  );
};

interface TotalProps {
  parts: Array<CoursePart>
}

const Total = ({parts}:TotalProps) => {
  const total = parts.reduce((carry, part) =>  carry + part.exerciseCount, 0);
  return (
    <p>
      Number of exercises {" "}
      {total}
    </p>
  );
};

/**
 * Helper function for exhaustive type checking
 */

const assertNever = (value: never): never => {
  throw new Error(`Unhandled discriminated union member: ${JSON.stringify(value)}`);
};
 
const App = ():JSX.Element => {
  const courseName = "Half stack application development";
  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is the easy course part",
      type: "normal"
    },
    {
      name: "Advanced",
      exerciseCount: 7,
      description: "This is the hard course part",
      type: "normal"
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3,
      type: "groupProject"
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      exerciseSubmissionLink: "https://fake-exercise-submit.made-up-url.dev",
      type: "submission"
    },
    {
      name: "Backend development",
      exerciseCount: 21,
      description: "Typing the backend",
      requirements: ["nodejs", "jest"],
      type: "special"
    }
  ];

  // courseParts.forEach(part => {
  //   switch (part.type) {
  //     case "normal": 
  //       console.log(part);
  //       break;
  //     case "groupProject":
  //       console.log(part.exerciseCount);
  //       break;
  //     case "submission": 
  //       console.log(part.exerciseSubmissionLink);
  //       break;
  //     default: 
  //       return assertNever(part);  
  //   }
  // });

  return (
    <div>
      <Header name={courseName} />
      <Content parts={courseParts} />
      <Total parts={courseParts} />
    </div>
  );
};

export default App;