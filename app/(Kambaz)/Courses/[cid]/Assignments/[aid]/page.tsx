export default function AssignmentEditor({
  params,
}: { params: { cid: string; aid: string } }) {
  const { aid } = params;

  const assignmentName = `${aid}`;
  return (
    <div id="wd-assignments-editor">
      <label htmlFor="wd-name">Assignment Name</label>
      <input id="wd-name" defaultValue={assignmentName} />
      <br />
      <br />
      <textarea
        id="wd-description"
        defaultValue={
          "The assignment is available online. Submit a link to the landing page of"
        }
      />
      <br />
      <table>
        <tbody>
          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-points">Points</label>
            </td>
            <td>
              <input id="wd-points" type="number" defaultValue={100} />
            </td>
          </tr>

          {/* Complete on your own */}

          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-due-date">Due date</label>
            </td>
            <td>
              <input id="wd-due-date" type="date" defaultValue="2025-10-01" />
            </td>
          </tr>

          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-group">Assignment Group</label>
            </td>
            <td>
              <select id="wd-group" defaultValue="ASSIGNMENTS">
                <option value="ASSIGNMENTS">Assignments</option>
                <option value="PROJECT">Project</option>
                <option value="QUIZZES">Quizzes</option>
                <option value="EXAMS">Exams</option>
              </select>
            </td>
          </tr>

          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-display-grade">Display Grade as</label>
            </td>
            <td>
              <select id="wd-display-grade" defaultValue="PERCENTAGE">
                <option value="LETTER">Letter Grade</option>
                <option value="PERCENTAGE">Percentage</option>
                <option value="POINTS">Points</option>
              </select>
            </td>
          </tr>

          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-submission-type">Submission Type</label>
            </td>
            <td>
              <select id="wd-submission-type" defaultValue="ONLINE">
                <option value="ONLINE">Online</option>
                <option value="ON_PAPER">On Paper</option>
                <option value="NONE">No Submission</option>
              </select>
            </td>
          </tr>

          <tr>
            <td align="right" valign="top">Online Entry Options</td>
            <td>
              <label><input id="wd-text-entry" type="checkbox" /> Text Entry</label><br />
              <label><input id="wd-website-url" type="checkbox" /> Website URL</label><br />
              <label><input id="wd-media-recordings" type="checkbox" /> Media Recordings</label><br />
              <label><input id="wd-student-annotation" type="checkbox" /> Student Annotation</label><br />
              <label><input id="wd-file-upload" type="checkbox" /> File Uploads</label>
            </td>
          </tr>

          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-assign-to">Assign to</label>
            </td>
            <td>
              <input id="wd-assign-to" defaultValue="Everyone" />
            </td>
          </tr>

          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-available-from">Available from</label>
            </td>
            <td>
              <input id="wd-available-from" type="date" defaultValue="2025-09-15" />
            </td>
          </tr>

          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-available-until">Until</label>
            </td>
            <td>
              <input id="wd-available-until" type="date" defaultValue="2025-12-31" />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}