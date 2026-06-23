"use client";

import { FormEvent, useState } from "react";
import styles from "./AdminPage.module.css";

export default function AdminLogin({ configured }: { configured: boolean }) {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function submit(event: FormEvent) {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const result = (await response.json()) as { error?: string };

      if (!response.ok) {
        throw new Error(result.error || "เข้าสู่ระบบไม่สำเร็จ");
      }

      window.location.reload();
    } catch (err) {
      setError(err instanceof Error ? err.message : "เข้าสู่ระบบไม่สำเร็จ");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className={styles.loginPage}>
      <form className={styles.loginCard} onSubmit={submit}>
        <div className={styles.loginBadge}>ADSAWIN CMS</div>
        <h1>เข้าสู่ระบบ</h1>
        <p>จัดการ Characters, Category และ Pattern</p>

        {!configured ? (
          <div className={styles.setupBox}>
            ยังไม่ได้ตั้งค่า <strong>ADMIN_PASSWORD</strong>
            <br />
            เพิ่มตัวแปรนี้ใน Vercel → Settings → Environment Variables แล้วดึง env ใหม่
          </div>
        ) : (
          <>
            <label className={styles.fieldLabel}>
              รหัสผ่านหลังบ้าน
              <input
                className={styles.input}
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                autoFocus
                required
              />
            </label>

            {error && <div className={styles.errorBox}>{error}</div>}

            <button className={styles.primaryButton} type="submit" disabled={loading}>
              {loading ? "กำลังตรวจสอบ..." : "เข้าสู่ระบบ"}
            </button>
          </>
        )}
      </form>
    </main>
  );
}
