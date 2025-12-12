// Uncomment this line to use CSS modules
// import styles from './app.module.scss';
import { useState } from 'react';
import { AccountingForm } from '../entities/accounting';
import { OperationRecord } from '../entities/accounting/models';

export function App() {
  const [operationHistory, setOperationHistory] = useState<OperationRecord[]>([]);

  return (
    <div>
      <AccountingForm onSubmit={(operation) => setOperationHistory((oh) => [operation, ...oh])} />
        <pre>
          {JSON.stringify(operationHistory, null, 2)}
        </pre>
    </div>
  );
}

export default App;
