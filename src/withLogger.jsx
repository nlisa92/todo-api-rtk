import { useEffect } from "react";

const withLogger = (WrappedComponent) => {
  return function LoggerWrapper(props) {
    useEffect(() => {
      if (props.task) {
        console.log(`[LOG] Отображение задачи: "${props.task.title}"`);
      }

      if (props.tasks) {
        console.log(
          `[LOG] Отображение списка задач. Всего: ${props.tasks.length}`
        );
      }
    }, [props.task, props.tasks]);

    return <WrappedComponent {...props} />;
  };
};

export default withLogger;
