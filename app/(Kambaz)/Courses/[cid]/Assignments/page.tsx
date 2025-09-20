import Link from "next/link";

export default function Assignments({ params }: { params: { cid: string } }) {
  const { cid } = params;

  return (
    <div id="wd-assignments">
      <input placeholder="Search for Assignments" id="wd-search-assignment" />
      <button id="wd-add-assignment-group">+ Group</button>
      <button id="wd-add-assignment">+ Assignment</button>
      <h3 id="wd-assignments-title">
        ASSIGNMENTS 40% of Total <button>+</button>
      </h3>
      <ul id="wd-assignment-list">
        <li className="wd-assignment-list-item">
          <Link href={`/Courses/${cid}/Assignments/0`} className="wd-assignment-link">
            A0
          </Link>
        </li>

        <li className="wd-assignment-list-item">
          {/* Complete On Your Own */}
          <Link href={`/Courses/${cid}/Assignments/1`} className="wd-assignment-link">
            A1
          </Link>
        </li>

        <li className="wd-assignment-list-item">
          <Link href={`/Courses/${cid}/Assignments/2`} className="wd-assignment-link">
            A2
          </Link>
        </li>
        <li className="wd-assignment-list-item">
          <Link href={`/Courses/${cid}/Assignments/3`} className="wd-assignment-link">
            A3
          </Link>
        </li>

        <li className="wd-assignment-list-item">
          <Link href={`/Courses/${cid}/Assignments/4`} className="wd-assignment-link">
            A4
          </Link>
        </li>
        <li className="wd-assignment-list-item">
          <Link href={`/Courses/${cid}/Assignments/5`} className="wd-assignment-link">
            A5
          </Link>
        </li>

        <li className="wd-assignment-list-item">
          <Link href={`/Courses/${cid}/Assignments/6`} className="wd-assignment-link">
            A6
          </Link>
        </li>
        <li className="wd-assignment-list-item">
          <Link href={`/Courses/${cid}/Assignments/7`} className="wd-assignment-link">
            A7
          </Link>
        </li>

        <li className="wd-assignment-list-item">
          <Link href={`/Courses/${cid}/Assignments/8`} className="wd-assignment-link">
            A8
          </Link>
        </li>
        <li className="wd-assignment-list-item">
          <Link href={`/Courses/${cid}/Assignments/9`} className="wd-assignment-link">
            A9
          </Link>
        </li>

        <li className="wd-assignment-list-item">
          <Link href={`/Courses/${cid}/Assignments/10`} className="wd-assignment-link">
            A10
          </Link>
        </li>
        <li className="wd-assignment-list-item">
          <Link href={`/Courses/${cid}/Assignments/11`} className="wd-assignment-link">
            A11
          </Link>
        </li>

        <li className="wd-assignment-list-item">
          <Link href={`/Courses/${cid}/Assignments/12`} className="wd-assignment-link">
            A12
          </Link>
        </li>
        <li className="wd-assignment-list-item">
          <Link href={`/Courses/${cid}/Assignments/13`} className="wd-assignment-link">
            A13
          </Link>
        </li>
      </ul>
    </div>
  );
}
