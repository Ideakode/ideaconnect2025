```mermaid
graph TD;
    subgraph Motivation["Shared Space Motivation"];
      A["Motivation: To Avoid Code Duplication for common classes for client and server"] --> B{Challenge: Client can't Access data outside of public Location path};      
      B-->C[Client Cannot Access Code];
      C-->D[Rejected solution: Public Folder Alias];
    C-->E[Rejected solution: 3rd Party Library,e.g. Webpack];
    D-->G[Drawbacks: other Issues to fix, Dependencies, Learning Curve];
    E-->G;
      end;

      subgraph Solution
        G-->Sol[Copy Mechanism during build time];
        Sol-->I(At Compile/Build Time);

        I -->Client[Client];
        I -->Server[Server];

        Client -- "Copies items from main shared"-->K[Internal shared folder client/shared];
        Server -- "Copies items from main shared" --> L[Internal shared folder server/shared];
        K --> M[Client Only Aware of Internal Shared Folder. Any reference to shared code is made only to this internal shared folder.];

        L --> N[Server Only Aware of Internal Shared Folder. <br/> 
                Any reference to shared code is made only to this internal shared folder.];

    end;

    Sol-->Drawback["Drawback: <br/>updates in shared code needs only to be done on main shared folder"]
  ```


