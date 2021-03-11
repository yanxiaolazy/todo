import React from "react";

const styles = {
  error: {
    fontSize: 18,
    fontWeight: 600,
    color: 'rgb(45, 58, 52)'
  }
}

export default class ErrorBoundary extends React.Component {
  state = {
    hasError: false
  }

  static getDerivedStateFromError(error) {
    return {hasError: true}
  }

  componentDidCatch(error, errorInfo) {
    const {onLogger} = this.props;

    onLogger({
      error: error.toString(), 
      errorInfo: errorInfo.componentStack.toString()
    });
  }

  render() {
    const {children} = this.props,
          {hasError} = this.state
    
    return(
      <div>
        {hasError ? 
        <div>
          <p style={styles.error}>Error</p>
          <p>Something went wrong</p>
        </div> :
        children}
      </div>
    );
  }
}