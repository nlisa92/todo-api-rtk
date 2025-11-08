import React, { useEffect } from "react";

const withLogger = (WrappedComponent) => {
  const LoggerWrapper = React.memo((props) => {
    useEffect(() => {
      if (props.task) {
        console.log(`[LOG] Отображение задачи: "${props.task.title}"`);
      }

      if (props.tasks) {
        console.log(`[LOG] Отображение списка задач. Всего: ${props.tasks.length}`);
      }
    }, [props.task, props.tasks]);

    return <WrappedComponent {...props} />;
  });

  LoggerWrapper.displayName = `WithLogger(${WrappedComponent.displayName || WrappedComponent.name || "Component"})`;

  return LoggerWrapper;
};

export default withLogger;
