import React from 'react';


// updated text - JM - 11/19

const AboutPage = () => (
  <div className="container">
    <div>
      <p>Established 127 years ago, Fraser, Ltd. is the longest running non-profit in North Dakota.
      To this day they continue their original focus on the needs of both children and adults, but have
      also expanded their services to include independent living supports, residential services, and more.
      This expanded effort means there’s a lot to maintain, and keep track of.  This is where Fraser MMS will come into play.

      Currently Fraser’s process to file and maintain maintenance tickets is all paper based.  A Resident Coordinator
      will submit a request by filling out a paper work order and fax or scan it to the Director of Program Operations.
      From there, the Director of Program Operations will meet with the Maintenance Personal and assign priority of
      work to each work order.  The process is cumbersome and there is not a lot of visibility resulting in duplicate
      work orders being submitted.

      The Fraser MMS application is a custom-built web-based solution to Fraser, LTD’s ongoing maintenance management system.
      This will streamline communication between Resident Coordinators, the Director of Program Operations, and the maintenance
      staff with a goal to eliminate paperwork and cumbersome submission processes.

      The Fraser MMS will have three levels of users Admin, Maintenance, Resident Coordinator.
      The Resident Coordinator will have the ability to add new work orders, edit status of work orders,
      see only the work orders pertaining to their building.  The Maintenance users will have similar functionality
      to the resident coordinator with an added functionality of assigning priority to work orders.
      The Admin will have all the functionality of the RC and the Maintenance users along with assigning work orders
      to specific maintenance staff, adding users to the system (can also edit current users and update passwords
      for said users in case they forget a password), add and edit all properties (this includes adding and editing 
      the units for the property).
    </p>
    </div>
  </div>
);

export default AboutPage;
