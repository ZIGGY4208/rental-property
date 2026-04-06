import React from 'react';

const EmployeeTable = () => {
  const employees = [
    {
      name: 'Christin Ericssen',
      policyAmount: '$5,000',
      policyType: 'Base Policy',
      policyStatus: 'Approved',
      destination: 'Huston, US',
      status: 'Active',
      progress: 'On Track'
    },
    {
      name: 'Angie E. Swift',
      policyAmount: '$20,000',
      policyType: 'All Inclusive Policy',
      policyStatus: 'Awaiting Approval',
      destination: 'Huston, US',
      status: 'Waiting',
      progress: 'Waiting'
    },
    {
      name: 'Ronals Koeman',
      policyAmount: '$5,000',
      policyType: 'Base Policy',
      policyStatus: 'Approved',
      destination: 'Huston, US',
      status: 'Canceled',
      progress: 'Canceled'
    },
    {
      name: 'June Simmons',
      policyAmount: '$5,000',
      policyType: 'Base Policy',
      policyStatus: 'Rejected',
      destination: 'Huston, US',
      status: 'Rejected',
      progress: 'Overdue'
    },
    {
      name: 'Ben West',
      policyAmount: '$25,000',
      policyType: 'Base Policy',
      policyStatus: 'Awaiting Approval',
      destination: 'Boston, US',
      status: 'Active',
      progress: 'On track'
    },
    {
      name: 'Natalie Quest',
      policyAmount: '$30,000',
      policyType: 'All Inclusive Policy',
      policyStatus: 'Rejected',
      destination: 'Huston, US',
      status: 'Rejected',
      progress: 'Overdue'
    },
    {
      name: 'Thomas Perez',
      policyAmount: '$45,000',
      policyType: 'All Inclusive Policy',
      policyStatus: 'Approved',
      destination: 'New York, US',
      status: 'Active',
      progress: 'Done'
    }
  ];

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'active':
      case 'approved':
      case 'on track':
      case 'done':
        return 'bg-green-100 text-green-800';
      case 'waiting':
      case 'awaiting approval':
        return 'bg-yellow-100 text-yellow-800';
      case 'canceled':
      case 'rejected':
      case 'overdue':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {/* Header */}
          <div className="bg-gray-800 text-white px-6 py-4">
            <h1 className="text-2xl font-bold">Employees (7)</h1>
          </div>
          
          {/* Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    NAME
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    POLICY
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    POLICY STATUS
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    DESTINATION
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    STATUS
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    PROGRESS
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {employees.map((employee, index) => (
                  <tr key={index} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {employee.name}
                      </div>
                      <div className="text-sm text-gray-500">
                        {employee.policyAmount}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {employee.policyType}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(employee.policyStatus)}`}>
                        {employee.policyStatus}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {employee.destination}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(employee.status)}`}>
                        {employee.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(employee.progress)}`}>
                        {employee.progress}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeTable;